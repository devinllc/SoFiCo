const Profile = require('../entities/Profile');

class ProfileRepository {
    async create(profileData) {
        const profile = new Profile(profileData);
        return profile.save();
    }

    async findByUserId(userId) {
        return Profile.findByUserId(userId);
    }

    async findById(id) {
        return Profile.findById(id);
    }

    async update(userId, updateData) {
        return Profile.findOneAndUpdate(
            { userId },
            { $set: updateData },
            { new: true, runValidators: true }
        );
    }

    async updateKycStatus(userId, status, documentType = null) {
        const profile = await this.findByUserId(userId);
        if (!profile) {
            throw new Error('Profile not found');
        }
        return profile.updateKycStatus(status, documentType);
    }

    async addKycDocument(userId, documentData) {
        return Profile.findOneAndUpdate(
            { userId },
            {
                $push: { kycDocuments: documentData },
                $set: { 'metadata.lastKycUpdate': new Date() }
            },
            { new: true, runValidators: true }
        );
    }

    async updateKycDocument(userId, documentType, updateData) {
        return Profile.findOneAndUpdate(
            {
                userId,
                'kycDocuments.type': documentType
            },
            {
                $set: {
                    'kycDocuments.$.verified': updateData.verified,
                    'kycDocuments.$.verifiedAt': updateData.verifiedAt,
                    'kycDocuments.$.documentUrl': updateData.documentUrl,
                    'metadata.lastKycUpdate': new Date()
                }
            },
            { new: true }
        );
    }

    async updateBankDetails(userId, bankDetails) {
        return Profile.findOneAndUpdate(
            { userId },
            {
                $set: {
                    bankDetails,
                    'metadata.lastProfileUpdate': new Date()
                }
            },
            { new: true, runValidators: true }
        );
    }

    async updatePreferences(userId, preferences) {
        return Profile.findOneAndUpdate(
            { userId },
            {
                $set: {
                    preferences,
                    'metadata.lastProfileUpdate': new Date()
                }
            },
            { new: true, runValidators: true }
        );
    }

    async addDevice(userId, deviceInfo) {
        const profile = await this.findByUserId(userId);
        if (!profile) {
            throw new Error('Profile not found');
        }
        return profile.addDevice(deviceInfo);
    }

    async findByKycStatus(status) {
        return Profile.findByKycStatus(status);
    }

    async delete(userId) {
        return Profile.findOneAndDelete({ userId });
    }
}

module.exports = new ProfileRepository(); 