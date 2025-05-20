const Admin = require('../entities/Admin');
const { generateAdminId } = require('../../../utils/helpers');

class AdminRepository {
    async create(adminData) {
        const adminId = await generateAdminId();
        const admin = new Admin({
            ...adminData,
            adminId,
            metadata: {
                ...adminData.metadata,
                lastPasswordChange: new Date()
            }
        });
        return admin.save();
    }

    async findByUserId(userId) {
        return Admin.findByUserId(userId);
    }

    async findByAdminId(adminId) {
        return Admin.findByAdminId(adminId);
    }

    async findById(id) {
        return Admin.findById(id);
    }

    async update(userId, updateData) {
        return Admin.findOneAndUpdate(
            { userId },
            { $set: updateData },
            { new: true, runValidators: true }
        );
    }

    async updateStatus(userId, status) {
        const admin = await this.findByUserId(userId);
        if (!admin) {
            throw new Error('Admin not found');
        }
        return admin.updateStatus(status);
    }

    async updatePermissions(userId, permissions) {
        return Admin.findOneAndUpdate(
            { userId },
            { $set: { permissions } },
            { new: true, runValidators: true }
        );
    }

    async updateAssignedRegions(userId, regions) {
        return Admin.findOneAndUpdate(
            { userId },
            { $set: { assignedRegions: regions } },
            { new: true, runValidators: true }
        );
    }

    async addActivityLog(userId, activity) {
        const admin = await this.findByUserId(userId);
        if (!admin) {
            throw new Error('Admin not found');
        }
        return admin.addActivityLog(activity);
    }

    async incrementLoginAttempts(userId) {
        const admin = await this.findByUserId(userId);
        if (!admin) {
            throw new Error('Admin not found');
        }
        return admin.incrementLoginAttempts();
    }

    async resetLoginAttempts(userId) {
        const admin = await this.findByUserId(userId);
        if (!admin) {
            throw new Error('Admin not found');
        }
        return admin.resetLoginAttempts();
    }

    async updateTwoFactor(userId, enabled, secret = null) {
        return Admin.findOneAndUpdate(
            { userId },
            {
                $set: {
                    'metadata.twoFactorEnabled': enabled,
                    'metadata.twoFactorSecret': secret,
                    'metadata.lastPasswordChange': new Date()
                }
            },
            { new: true }
        );
    }

    async addDevice(userId, deviceInfo) {
        const admin = await this.findByUserId(userId);
        if (!admin) {
            throw new Error('Admin not found');
        }
        return admin.addDevice(deviceInfo);
    }

    async findByRole(role) {
        return Admin.findByRole(role);
    }

    async findByDepartment(department) {
        return Admin.findByDepartment(department);
    }

    async findByRegion(type, value) {
        return Admin.findByRegion(type, value);
    }

    async getActivityLog(userId, options = {}) {
        const { startDate, endDate, module, action, limit = 100, skip = 0 } = options;
        const query = { userId };

        if (startDate || endDate) {
            query['activityLog.timestamp'] = {};
            if (startDate) query['activityLog.timestamp'].$gte = new Date(startDate);
            if (endDate) query['activityLog.timestamp'].$lte = new Date(endDate);
        }

        if (module) query['activityLog.module'] = module;
        if (action) query['activityLog.action'] = action;

        const admin = await Admin.findOne(query)
            .select('activityLog')
            .slice('activityLog', [skip, limit])
            .sort({ 'activityLog.timestamp': -1 });

        return admin ? admin.activityLog : [];
    }

    async delete(userId) {
        return Admin.findOneAndDelete({ userId });
    }
}

module.exports = new AdminRepository(); 