const { Schema, model } = require('mongoose');

const agentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    agentId: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'suspended', 'terminated'],
        default: 'active'
    },
    type: {
        type: String,
        enum: ['individual', 'business'],
        required: true
    },
    businessDetails: {
        name: String,
        registrationNumber: String,
        taxId: String,
        address: {
            street: String,
            city: String,
            state: String,
            country: String,
            postalCode: String
        }
    },
    commission: {
        rate: {
            type: Number,
            required: true,
            min: 0,
            max: 100
        },
        type: {
            type: String,
            enum: ['percentage', 'fixed'],
            required: true
        }
    },
    performance: {
        totalLoans: {
            type: Number,
            default: 0
        },
        totalDisbursed: {
            type: Number,
            default: 0
        },
        successRate: {
            type: Number,
            default: 0
        },
        rating: {
            type: Number,
            min: 0,
            max: 5,
            default: 0
        }
    },
    assignedArea: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true
        }
    },
    serviceArea: {
        radius: Number, // in kilometers
        cities: [String],
        states: [String]
    },
    documents: [{
        type: {
            type: String,
            enum: ['id_proof', 'address_proof', 'business_registration', 'tax_certificate', 'bank_statement']
        },
        number: String,
        url: String,
        verified: {
            type: Boolean,
            default: false
        },
        verifiedAt: Date,
        expiryDate: Date
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
    metadata: {
        onboardingDate: Date,
        lastActive: Date,
        lastTraining: Date,
        trainingStatus: {
            type: String,
            enum: ['pending', 'completed', 'expired'],
            default: 'pending'
        },
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
agentSchema.index({ userId: 1 });
agentSchema.index({ agentId: 1 });
agentSchema.index({ status: 1 });
agentSchema.index({ 'assignedArea.coordinates': '2dsphere' });
agentSchema.index({ 'serviceArea.cities': 1 });
agentSchema.index({ 'serviceArea.states': 1 });

// Methods
agentSchema.methods.updateStatus = async function(status) {
    this.status = status;
    if (status === 'active') {
        this.metadata.lastActive = new Date();
    }
    return this.save();
};

agentSchema.methods.updatePerformance = async function(loanAmount, success) {
    this.performance.totalLoans += 1;
    if (success) {
        this.performance.totalDisbursed += loanAmount;
        this.performance.successRate = (this.performance.successRate * (this.performance.totalLoans - 1) + 1) / this.performance.totalLoans;
    } else {
        this.performance.successRate = (this.performance.successRate * (this.performance.totalLoans - 1)) / this.performance.totalLoans;
    }
    return this.save();
};

agentSchema.methods.addDevice = async function(deviceInfo) {
    const existingDevice = this.metadata.deviceInfo.find(d => d.deviceId === deviceInfo.deviceId);
    if (existingDevice) {
        existingDevice.lastLogin = new Date();
    } else {
        this.metadata.deviceInfo.push({
            ...deviceInfo,
            lastLogin: new Date()
        });
    }
    this.metadata.lastActive = new Date();
    return this.save();
};

// Static methods
agentSchema.statics.findByUserId = function(userId) {
    return this.findOne({ userId });
};

agentSchema.statics.findByAgentId = function(agentId) {
    return this.findOne({ agentId });
};

agentSchema.statics.findByStatus = function(status) {
    return this.find({ status });
};

agentSchema.statics.findNearby = function(coordinates, maxDistance) {
    return this.find({
        'assignedArea.coordinates': {
            $near: {
                $geometry: {
                    type: 'Point',
                    coordinates: coordinates
                },
                $maxDistance: maxDistance * 1000 // Convert km to meters
            }
        },
        status: 'active'
    });
};

const Agent = model('Agent', agentSchema);

module.exports = Agent; 