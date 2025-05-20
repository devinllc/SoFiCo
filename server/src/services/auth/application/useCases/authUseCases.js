const jwt = require('jsonwebtoken');
const { authenticator } = require('otplib');
const qrcode = require('qrcode');
const config = require('../../../config');
const userRepository = require('../../domain/repositories/UserRepository');
const { logger } = require('../../../utils/logger');
const { ValidationError, AuthenticationError, AuthorizationError } = require('../../../utils/errors');

class AuthUseCases {
    async register(userData) {
        try {
            const existingUser = await userRepository.findByEmail(userData.email);
            if (existingUser) {
                throw new ValidationError('Email already registered');
            }

            const user = await userRepository.create(userData);
            const { accessToken, refreshToken } = await this.generateTokens(user);

            await userRepository.updateRefreshToken(user._id, refreshToken, new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));

            return {
                user: this.sanitizeUser(user),
                accessToken,
                refreshToken
            };
        } catch (error) {
            logger.error('Registration error:', error);
            throw error;
        }
    }

    async login(email, password) {
        try {
            const user = await userRepository.findByEmail(email).select('+password');
            if (!user) {
                throw new AuthenticationError('Invalid credentials');
            }

            if (user.status !== 'active') {
                throw new AuthenticationError('Account is not active');
            }

            if (user.lockUntil && user.lockUntil > Date.now()) {
                throw new AuthenticationError('Account is locked. Try again later');
            }

            const isPasswordValid = await user.comparePassword(password);
            if (!isPasswordValid) {
                await user.incrementLoginAttempts();
                throw new AuthenticationError('Invalid credentials');
            }

            if (user.mfaEnabled) {
                return { requiresMFA: true, userId: user._id };
            }

            await user.resetLoginAttempts();
            await userRepository.updateLastLogin(user._id);

            const { accessToken, refreshToken } = await this.generateTokens(user);
            await userRepository.updateRefreshToken(user._id, refreshToken, new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));

            return {
                user: this.sanitizeUser(user),
                accessToken,
                refreshToken
            };
        } catch (error) {
            logger.error('Login error:', error);
            throw error;
        }
    }

    async verifyMFA(userId, token) {
        try {
            const user = await userRepository.findById(userId).select('+mfaSecret');
            if (!user || !user.mfaEnabled) {
                throw new AuthenticationError('MFA not enabled');
            }

            const isValid = authenticator.verify({
                token,
                secret: user.mfaSecret
            });

            if (!isValid) {
                throw new AuthenticationError('Invalid MFA token');
            }

            await userRepository.updateLastLogin(user._id);
            const { accessToken, refreshToken } = await this.generateTokens(user);
            await userRepository.updateRefreshToken(user._id, refreshToken, new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));

            return {
                user: this.sanitizeUser(user),
                accessToken,
                refreshToken
            };
        } catch (error) {
            logger.error('MFA verification error:', error);
            throw error;
        }
    }

    async setupMFA(userId) {
        try {
            const user = await userRepository.findById(userId);
            if (!user) {
                throw new ValidationError('User not found');
            }

            if (user.mfaEnabled) {
                throw new ValidationError('MFA already enabled');
            }

            const secret = authenticator.generateSecret();
            const otpauth = authenticator.keyuri(user.email, 'SoFiCo', secret);
            const qrCode = await qrcode.toDataURL(otpauth);

            await userRepository.updateMFA(userId, false, secret);

            return { secret, qrCode };
        } catch (error) {
            logger.error('MFA setup error:', error);
            throw error;
        }
    }

    async enableMFA(userId, token) {
        try {
            const user = await userRepository.findById(userId).select('+mfaSecret');
            if (!user) {
                throw new ValidationError('User not found');
            }

            if (user.mfaEnabled) {
                throw new ValidationError('MFA already enabled');
            }

            const isValid = authenticator.verify({
                token,
                secret: user.mfaSecret
            });

            if (!isValid) {
                throw new AuthenticationError('Invalid MFA token');
            }

            await userRepository.updateMFA(userId, true, user.mfaSecret);
            return { message: 'MFA enabled successfully' };
        } catch (error) {
            logger.error('MFA enable error:', error);
            throw error;
        }
    }

    async disableMFA(userId, token) {
        try {
            const user = await userRepository.findById(userId).select('+mfaSecret');
            if (!user || !user.mfaEnabled) {
                throw new ValidationError('MFA not enabled');
            }

            const isValid = authenticator.verify({
                token,
                secret: user.mfaSecret
            });

            if (!isValid) {
                throw new AuthenticationError('Invalid MFA token');
            }

            await userRepository.updateMFA(userId, false, null);
            return { message: 'MFA disabled successfully' };
        } catch (error) {
            logger.error('MFA disable error:', error);
            throw error;
        }
    }

    async refreshToken(refreshToken) {
        try {
            const decoded = jwt.verify(refreshToken, config.jwt.secret);
            const user = await userRepository.findById(decoded.id);

            if (!user) {
                throw new AuthenticationError('Invalid refresh token');
            }

            const tokenExists = user.refreshTokens.some(t => t.token === refreshToken);
            if (!tokenExists) {
                throw new AuthenticationError('Invalid refresh token');
            }

            const { accessToken, refreshToken: newRefreshToken } = await this.generateTokens(user);
            await userRepository.removeRefreshToken(user._id, refreshToken);
            await userRepository.updateRefreshToken(user._id, newRefreshToken, new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));

            return {
                accessToken,
                refreshToken: newRefreshToken
            };
        } catch (error) {
            logger.error('Token refresh error:', error);
            throw error;
        }
    }

    async logout(userId, refreshToken) {
        try {
            await userRepository.removeRefreshToken(userId, refreshToken);
            return { message: 'Logged out successfully' };
        } catch (error) {
            logger.error('Logout error:', error);
            throw error;
        }
    }

    async logoutAll(userId) {
        try {
            await userRepository.removeAllRefreshTokens(userId);
            return { message: 'Logged out from all devices' };
        } catch (error) {
            logger.error('Logout all error:', error);
            throw error;
        }
    }

    async generateTokens(user) {
        const accessToken = jwt.sign(
            { id: user._id, role: user.role },
            config.jwt.secret,
            { expiresIn: config.jwt.accessTokenExpiry }
        );

        const refreshToken = jwt.sign(
            { id: user._id },
            config.jwt.secret,
            { expiresIn: config.jwt.refreshTokenExpiry }
        );

        return { accessToken, refreshToken };
    }

    sanitizeUser(user) {
        const sanitized = user.toObject();
        delete sanitized.password;
        delete sanitized.mfaSecret;
        delete sanitized.refreshTokens;
        return sanitized;
    }
}

module.exports = new AuthUseCases(); 