const { Schema, model } = require('mongoose');

const profileSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    address: {
        street: String,
        city: String,
        state: String,
        country: String,
        postalCode: String
    },
    kycStatus: {
        type: String,
        enum: ['pending', 'verified', 'rejected'],
        default: 'pending'
    },
    kycDocuments: [{
        type: {
            type: String,
            enum: ['aadhar', 'pan', 'passport', 'driving_license']
        },
        number: String,
        verified: {
            type: Boolean,
            default: false
        },
        verifiedAt: Date,
        documentUrl: String
    }],
    bankDetails: {
        accountNumber: String,
        ifscCode: String,
        accountHolderName: String,
        bankName: String,
        verified: {
            type: Boolean,
            default: false
        }
    },
    preferences: {
        language: {
            type: String,
            enum: ['en', 'hi'],
            default: 'en'
        },
        notifications: {
            email: {
                type: Boolean,
                default: true
            },
            sms: {
                type: Boolean,
                default: true
            },
            push: {
                type: Boolean,
                default: true
            }
        }
    },
    metadata: {
        lastKycUpdate: Date,
        lastProfileUpdate: Date,
        deviceInfo: [{
            deviceId: String,
            deviceType: String,
            lastLogin: Date
        }]
    }
}, {
    timestamps: true
});

// Indexes
profileSchema.index({ userId: 1 });
profileSchema.index({ 'kycDocuments.number': 1 });
profileSchema.index({ kycStatus: 1 });

// Methods
profileSchema.methods.updateKycStatus = async function(status, documentType = null) {
    if (documentType) {
        const doc = this.kycDocuments.find(d => d.type === documentType);
        if (doc) {
            doc.verified = status === 'verified';
            doc.verifiedAt = status === 'verified' ? new Date() : null;
        }
    }
    this.kycStatus = status;
    this.metadata.lastKycUpdate = new Date();
    return this.save();
};

profileSchema.methods.addDevice = async function(deviceInfo) {
    const existingDevice = this.metadata.deviceInfo.find(d => d.deviceId === deviceInfo.deviceId);
    if (existingDevice) {
        existingDevice.lastLogin = new Date();
    } else {
        this.metadata.deviceInfo.push({
            ...deviceInfo,
            lastLogin: new Date()
        });
    }
    return this.save();
};

// Static methods
profileSchema.statics.findByUserId = function(userId) {
    return this.findOne({ userId });
};

profileSchema.statics.findByKycStatus = function(status) {
    return this.find({ kycStatus: status });
};

const Profile = model('Profile', profileSchema);

module.exports = Profile; 