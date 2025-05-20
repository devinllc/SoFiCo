const User = require('../entities/User');

class UserRepository {
    async create(userData) {
        const user = new User(userData);
        return user.save();
    }

    async findByEmail(email) {
        return User.findByEmail(email);
    }

    async findById(id) {
        return User.findById(id);
    }

    async update(id, updateData) {
        return User.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        );
    }

    async updateRefreshToken(userId, refreshToken, expiresAt) {
        return User.findByIdAndUpdate(
            userId,
            {
                $push: {
                    refreshTokens: {
                        token: refreshToken,
                        expiresAt
                    }
                }
            },
            { new: true }
        );
    }

    async removeRefreshToken(userId, refreshToken) {
        return User.findByIdAndUpdate(
            userId,
            {
                $pull: {
                    refreshTokens: { token: refreshToken }
                }
            },
            { new: true }
        );
    }

    async removeAllRefreshTokens(userId) {
        return User.findByIdAndUpdate(
            userId,
            { $set: { refreshTokens: [] } },
            { new: true }
        );
    }

    async updateLoginAttempts(userId, attempts) {
        return User.findByIdAndUpdate(
            userId,
            { $set: { loginAttempts: attempts } },
            { new: true }
        );
    }

    async updateLockUntil(userId, lockUntil) {
        return User.findByIdAndUpdate(
            userId,
            { $set: { lockUntil } },
            { new: true }
        );
    }

    async updateLastLogin(userId) {
        return User.findByIdAndUpdate(
            userId,
            { $set: { lastLogin: new Date() } },
            { new: true }
        );
    }

    async updateMFA(userId, mfaEnabled, mfaSecret) {
        return User.findByIdAndUpdate(
            userId,
            {
                $set: {
                    mfaEnabled,
                    mfaSecret: mfaEnabled ? mfaSecret : undefined
                }
            },
            { new: true }
        );
    }

    async updateStatus(userId, status) {
        return User.findByIdAndUpdate(
            userId,
            { $set: { status } },
            { new: true }
        );
    }

    async findByRole(role) {
        return User.find({ role });
    }

    async countByRole(role) {
        return User.countDocuments({ role });
    }
}

module.exports = new UserRepository(); 