const Agent = require('../entities/Agent');
const { generateAgentId } = require('../../../utils/helpers');

class AgentRepository {
    async create(agentData) {
        const agentId = await generateAgentId();
        const agent = new Agent({
            ...agentData,
            agentId,
            metadata: {
                ...agentData.metadata,
                onboardingDate: new Date()
            }
        });
        return agent.save();
    }

    async findByUserId(userId) {
        return Agent.findByUserId(userId);
    }

    async findByAgentId(agentId) {
        return Agent.findByAgentId(agentId);
    }

    async findById(id) {
        return Agent.findById(id);
    }

    async update(userId, updateData) {
        return Agent.findOneAndUpdate(
            { userId },
            { $set: updateData },
            { new: true, runValidators: true }
        );
    }

    async updateStatus(userId, status) {
        const agent = await this.findByUserId(userId);
        if (!agent) {
            throw new Error('Agent not found');
        }
        return agent.updateStatus(status);
    }

    async updatePerformance(userId, loanAmount, success) {
        const agent = await this.findByUserId(userId);
        if (!agent) {
            throw new Error('Agent not found');
        }
        return agent.updatePerformance(loanAmount, success);
    }

    async updateCommission(userId, commissionData) {
        return Agent.findOneAndUpdate(
            { userId },
            { $set: { commission: commissionData } },
            { new: true, runValidators: true }
        );
    }

    async updateServiceArea(userId, serviceArea) {
        return Agent.findOneAndUpdate(
            { userId },
            { $set: { serviceArea } },
            { new: true, runValidators: true }
        );
    }

    async updateAssignedArea(userId, coordinates) {
        return Agent.findOneAndUpdate(
            { userId },
            {
                $set: {
                    'assignedArea.coordinates': coordinates
                }
            },
            { new: true, runValidators: true }
        );
    }

    async addDocument(userId, documentData) {
        return Agent.findOneAndUpdate(
            { userId },
            {
                $push: { documents: documentData }
            },
            { new: true, runValidators: true }
        );
    }

    async updateDocument(userId, documentType, updateData) {
        return Agent.findOneAndUpdate(
            {
                userId,
                'documents.type': documentType
            },
            {
                $set: {
                    'documents.$.verified': updateData.verified,
                    'documents.$.verifiedAt': updateData.verifiedAt,
                    'documents.$.url': updateData.url,
                    'documents.$.expiryDate': updateData.expiryDate
                }
            },
            { new: true }
        );
    }

    async updateBankDetails(userId, bankDetails) {
        return Agent.findOneAndUpdate(
            { userId },
            {
                $set: {
                    bankDetails,
                    'metadata.lastUpdate': new Date()
                }
            },
            { new: true, runValidators: true }
        );
    }

    async updateTrainingStatus(userId, status) {
        return Agent.findOneAndUpdate(
            { userId },
            {
                $set: {
                    'metadata.trainingStatus': status,
                    'metadata.lastTraining': new Date()
                }
            },
            { new: true }
        );
    }

    async addDevice(userId, deviceInfo) {
        const agent = await this.findByUserId(userId);
        if (!agent) {
            throw new Error('Agent not found');
        }
        return agent.addDevice(deviceInfo);
    }

    async findByStatus(status) {
        return Agent.findByStatus(status);
    }

    async findNearby(coordinates, maxDistance) {
        return Agent.findNearby(coordinates, maxDistance);
    }

    async findByServiceArea(city, state) {
        const query = {};
        if (city) {
            query['serviceArea.cities'] = city;
        }
        if (state) {
            query['serviceArea.states'] = state;
        }
        return Agent.find(query);
    }

    async delete(userId) {
        return Agent.findOneAndDelete({ userId });
    }
}

module.exports = new AgentRepository(); 