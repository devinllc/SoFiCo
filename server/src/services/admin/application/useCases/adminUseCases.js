const adminRepository = require('../../domain/repositories/AdminRepository');
const { ValidationError, NotFoundError, UnauthorizedError } = require('../../../utils/errors');
const { logger } = require('../../../utils/logger');
const { generateTwoFactorSecret, verifyTwoFactorToken } = require('../../../utils/twoFactor');

class AdminUseCases {
    async createAdmin(userId, adminData) {
        try {
            const existingAdmin = await adminRepository.findByUserId(userId);
            if (existingAdmin) {
                throw new ValidationError('Admin profile already exists for this user');
            }

            const admin = await adminRepository.create({
                userId,
                ...adminData
            });

            return this.sanitizeAdmin(admin);
        } catch (error) {
            logger.error('Create admin error:', error);
            throw error;
        }
    }

    async getAdmin(userId) {
        try {
            const admin = await adminRepository.findByUserId(userId);
            if (!admin) {
                throw new NotFoundError('Admin not found');
            }

            return this.sanitizeAdmin(admin);
        } catch (error) {
            logger.error('Get admin error:', error);
            throw error;
        }
    }

    async updateAdmin(userId, updateData) {
        try {
            const admin = await adminRepository.update(userId, updateData);
            if (!admin) {
                throw new NotFoundError('Admin not found');
            }

            return this.sanitizeAdmin(admin);
        } catch (error) {
            logger.error('Update admin error:', error);
            throw error;
        }
    }

    async updateStatus(userId, status) {
        try {
            const admin = await adminRepository.updateStatus(userId, status);
            if (!admin) {
                throw new NotFoundError('Admin not found');
            }

            return this.sanitizeAdmin(admin);
        } catch (error) {
            logger.error('Update admin status error:', error);
            throw error;
        }
    }

    async updatePermissions(userId, permissions) {
        try {
            const admin = await adminRepository.updatePermissions(userId, permissions);
            if (!admin) {
                throw new NotFoundError('Admin not found');
            }

            return this.sanitizeAdmin(admin);
        } catch (error) {
            logger.error('Update admin permissions error:', error);
            throw error;
        }
    }

    async updateAssignedRegions(userId, regions) {
        try {
            const admin = await adminRepository.updateAssignedRegions(userId, regions);
            if (!admin) {
                throw new NotFoundError('Admin not found');
            }

            return this.sanitizeAdmin(admin);
        } catch (error) {
            logger.error('Update admin assigned regions error:', error);
            throw error;
        }
    }

    async addActivityLog(userId, activity) {
        try {
            const admin = await adminRepository.addActivityLog(userId, activity);
            if (!admin) {
                throw new NotFoundError('Admin not found');
            }

            return this.sanitizeAdmin(admin);
        } catch (error) {
            logger.error('Add admin activity log error:', error);
            throw error;
        }
    }

    async handleLoginAttempt(userId, success) {
        try {
            if (success) {
                await adminRepository.resetLoginAttempts(userId);
            } else {
                const admin = await adminRepository.incrementLoginAttempts(userId);
                if (admin.metadata.lockUntil && admin.metadata.lockUntil > new Date()) {
                    throw new UnauthorizedError('Account is locked. Please try again later.');
                }
            }
        } catch (error) {
            logger.error('Handle admin login attempt error:', error);
            throw error;
        }
    }

    async setupTwoFactor(userId) {
        try {
            const admin = await adminRepository.findByUserId(userId);
            if (!admin) {
                throw new NotFoundError('Admin not found');
            }

            const secret = generateTwoFactorSecret();
            await adminRepository.updateTwoFactor(userId, false, secret);

            return {
                secret,
                qrCode: `otpauth://totp/Admin:${admin.adminId}?secret=${secret}&issuer=LoanApp`
            };
        } catch (error) {
            logger.error('Setup admin two factor error:', error);
            throw error;
        }
    }

    async verifyTwoFactor(userId, token) {
        try {
            const admin = await adminRepository.findByUserId(userId);
            if (!admin) {
                throw new NotFoundError('Admin not found');
            }

            if (!admin.metadata.twoFactorSecret) {
                throw new ValidationError('Two factor authentication not set up');
            }

            const isValid = verifyTwoFactorToken(admin.metadata.twoFactorSecret, token);
            if (!isValid) {
                throw new UnauthorizedError('Invalid two factor token');
            }

            return true;
        } catch (error) {
            logger.error('Verify admin two factor error:', error);
            throw error;
        }
    }

    async enableTwoFactor(userId, token) {
        try {
            const admin = await adminRepository.findByUserId(userId);
            if (!admin) {
                throw new NotFoundError('Admin not found');
            }

            if (!admin.metadata.twoFactorSecret) {
                throw new ValidationError('Two factor authentication not set up');
            }

            const isValid = verifyTwoFactorToken(admin.metadata.twoFactorSecret, token);
            if (!isValid) {
                throw new UnauthorizedError('Invalid two factor token');
            }

            await adminRepository.updateTwoFactor(userId, true);
            return this.sanitizeAdmin(admin);
        } catch (error) {
            logger.error('Enable admin two factor error:', error);
            throw error;
        }
    }

    async disableTwoFactor(userId, token) {
        try {
            const admin = await adminRepository.findByUserId(userId);
            if (!admin) {
                throw new NotFoundError('Admin not found');
            }

            if (!admin.metadata.twoFactorEnabled) {
                throw new ValidationError('Two factor authentication not enabled');
            }

            const isValid = verifyTwoFactorToken(admin.metadata.twoFactorSecret, token);
            if (!isValid) {
                throw new UnauthorizedError('Invalid two factor token');
            }

            await adminRepository.updateTwoFactor(userId, false, null);
            return this.sanitizeAdmin(admin);
        } catch (error) {
            logger.error('Disable admin two factor error:', error);
            throw error;
        }
    }

    async addDevice(userId, deviceInfo) {
        try {
            const admin = await adminRepository.addDevice(userId, deviceInfo);
            if (!admin) {
                throw new NotFoundError('Admin not found');
            }

            return this.sanitizeAdmin(admin);
        } catch (error) {
            logger.error('Add admin device error:', error);
            throw error;
        }
    }

    async getAdminsByRole(role) {
        try {
            const admins = await adminRepository.findByRole(role);
            return admins.map(admin => this.sanitizeAdmin(admin));
        } catch (error) {
            logger.error('Get admins by role error:', error);
            throw error;
        }
    }

    async getAdminsByDepartment(department) {
        try {
            const admins = await adminRepository.findByDepartment(department);
            return admins.map(admin => this.sanitizeAdmin(admin));
        } catch (error) {
            logger.error('Get admins by department error:', error);
            throw error;
        }
    }

    async getAdminsByRegion(type, value) {
        try {
            const admins = await adminRepository.findByRegion(type, value);
            return admins.map(admin => this.sanitizeAdmin(admin));
        } catch (error) {
            logger.error('Get admins by region error:', error);
            throw error;
        }
    }

    async getActivityLog(userId, options) {
        try {
            const admin = await adminRepository.findByUserId(userId);
            if (!admin) {
                throw new NotFoundError('Admin not found');
            }

            return await adminRepository.getActivityLog(userId, options);
        } catch (error) {
            logger.error('Get admin activity log error:', error);
            throw error;
        }
    }

    async deleteAdmin(userId) {
        try {
            const admin = await adminRepository.delete(userId);
            if (!admin) {
                throw new NotFoundError('Admin not found');
            }

            return { message: 'Admin deleted successfully' };
        } catch (error) {
            logger.error('Delete admin error:', error);
            throw error;
        }
    }

    sanitizeAdmin(admin) {
        const sanitized = admin.toObject();
        // Remove sensitive information
        delete sanitized.metadata.twoFactorSecret;
        return sanitized;
    }
}

module.exports = new AdminUseCases(); 