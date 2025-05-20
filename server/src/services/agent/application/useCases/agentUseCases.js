const agentRepository = require('../../domain/repositories/AgentRepository');
const { ValidationError, NotFoundError } = require('../../../utils/errors');
const { logger } = require('../../../utils/logger');

class AgentUseCases {
    async createAgent(userId, agentData) {
        try {
            const existingAgent = await agentRepository.findByUserId(userId);
            if (existingAgent) {
                throw new ValidationError('Agent profile already exists for this user');
            }

            const agent = await agentRepository.create({
                userId,
                ...agentData
            });

            return this.sanitizeAgent(agent);
        } catch (error) {
            logger.error('Create agent error:', error);
            throw error;
        }
    }

    async getAgent(userId) {
        try {
            const agent = await agentRepository.findByUserId(userId);
            if (!agent) {
                throw new NotFoundError('Agent not found');
            }

            return this.sanitizeAgent(agent);
        } catch (error) {
            logger.error('Get agent error:', error);
            throw error;
        }
    }

    async updateAgent(userId, updateData) {
        try {
            const agent = await agentRepository.update(userId, updateData);
            if (!agent) {
                throw new NotFoundError('Agent not found');
            }

            return this.sanitizeAgent(agent);
        } catch (error) {
            logger.error('Update agent error:', error);
            throw error;
        }
    }

    async updateStatus(userId, status) {
        try {
            const agent = await agentRepository.updateStatus(userId, status);
            if (!agent) {
                throw new NotFoundError('Agent not found');
            }

            return this.sanitizeAgent(agent);
        } catch (error) {
            logger.error('Update agent status error:', error);
            throw error;
        }
    }

    async updatePerformance(userId, loanAmount, success) {
        try {
            const agent = await agentRepository.updatePerformance(userId, loanAmount, success);
            if (!agent) {
                throw new NotFoundError('Agent not found');
            }

            return this.sanitizeAgent(agent);
        } catch (error) {
            logger.error('Update agent performance error:', error);
            throw error;
        }
    }

    async updateCommission(userId, commissionData) {
        try {
            const agent = await agentRepository.updateCommission(userId, commissionData);
            if (!agent) {
                throw new NotFoundError('Agent not found');
            }

            return this.sanitizeAgent(agent);
        } catch (error) {
            logger.error('Update agent commission error:', error);
            throw error;
        }
    }

    async updateServiceArea(userId, serviceArea) {
        try {
            const agent = await agentRepository.updateServiceArea(userId, serviceArea);
            if (!agent) {
                throw new NotFoundError('Agent not found');
            }

            return this.sanitizeAgent(agent);
        } catch (error) {
            logger.error('Update agent service area error:', error);
            throw error;
        }
    }

    async updateAssignedArea(userId, coordinates) {
        try {
            const agent = await agentRepository.updateAssignedArea(userId, coordinates);
            if (!agent) {
                throw new NotFoundError('Agent not found');
            }

            return this.sanitizeAgent(agent);
        } catch (error) {
            logger.error('Update agent assigned area error:', error);
            throw error;
        }
    }

    async submitDocument(userId, documentData) {
        try {
            const agent = await agentRepository.findByUserId(userId);
            if (!agent) {
                throw new NotFoundError('Agent not found');
            }

            // Validate document type
            const validTypes = ['id_proof', 'address_proof', 'business_registration', 'tax_certificate', 'bank_statement'];
            if (!validTypes.includes(documentData.type)) {
                throw new ValidationError('Invalid document type');
            }

            // Check if document already exists
            const existingDoc = agent.documents.find(d => d.type === documentData.type);
            if (existingDoc) {
                await agentRepository.updateDocument(userId, documentData.type, {
                    ...documentData,
                    verified: false,
                    verifiedAt: null
                });
            } else {
                await agentRepository.addDocument(userId, {
                    ...documentData,
                    verified: false
                });
            }

            return this.getAgent(userId);
        } catch (error) {
            logger.error('Submit agent document error:', error);
            throw error;
        }
    }

    async verifyDocument(userId, documentType, verified) {
        try {
            const agent = await agentRepository.findByUserId(userId);
            if (!agent) {
                throw new NotFoundError('Agent not found');
            }

            const document = agent.documents.find(d => d.type === documentType);
            if (!document) {
                throw new NotFoundError('Document not found');
            }

            await agentRepository.updateDocument(userId, documentType, {
                verified,
                verifiedAt: verified ? new Date() : null
            });

            return this.getAgent(userId);
        } catch (error) {
            logger.error('Verify agent document error:', error);
            throw error;
        }
    }

    async updateBankDetails(userId, bankDetails) {
        try {
            const agent = await agentRepository.updateBankDetails(userId, {
                ...bankDetails,
                verified: false
            });
            if (!agent) {
                throw new NotFoundError('Agent not found');
            }

            return this.sanitizeAgent(agent);
        } catch (error) {
            logger.error('Update agent bank details error:', error);
            throw error;
        }
    }

    async verifyBankDetails(userId, verified) {
        try {
            const agent = await agentRepository.findByUserId(userId);
            if (!agent) {
                throw new NotFoundError('Agent not found');
            }

            await agentRepository.updateBankDetails(userId, {
                ...agent.bankDetails,
                verified
            });

            return this.getAgent(userId);
        } catch (error) {
            logger.error('Verify agent bank details error:', error);
            throw error;
        }
    }

    async updateTrainingStatus(userId, status) {
        try {
            const agent = await agentRepository.updateTrainingStatus(userId, status);
            if (!agent) {
                throw new NotFoundError('Agent not found');
            }

            return this.sanitizeAgent(agent);
        } catch (error) {
            logger.error('Update agent training status error:', error);
            throw error;
        }
    }

    async addDevice(userId, deviceInfo) {
        try {
            const agent = await agentRepository.addDevice(userId, deviceInfo);
            if (!agent) {
                throw new NotFoundError('Agent not found');
            }

            return this.sanitizeAgent(agent);
        } catch (error) {
            logger.error('Add agent device error:', error);
            throw error;
        }
    }

    async getAgentsByStatus(status) {
        try {
            const agents = await agentRepository.findByStatus(status);
            return agents.map(agent => this.sanitizeAgent(agent));
        } catch (error) {
            logger.error('Get agents by status error:', error);
            throw error;
        }
    }

    async findNearbyAgents(coordinates, maxDistance) {
        try {
            const agents = await agentRepository.findNearby(coordinates, maxDistance);
            return agents.map(agent => this.sanitizeAgent(agent));
        } catch (error) {
            logger.error('Find nearby agents error:', error);
            throw error;
        }
    }

    async findAgentsByServiceArea(city, state) {
        try {
            const agents = await agentRepository.findByServiceArea(city, state);
            return agents.map(agent => this.sanitizeAgent(agent));
        } catch (error) {
            logger.error('Find agents by service area error:', error);
            throw error;
        }
    }

    async deleteAgent(userId) {
        try {
            const agent = await agentRepository.delete(userId);
            if (!agent) {
                throw new NotFoundError('Agent not found');
            }

            return { message: 'Agent deleted successfully' };
        } catch (error) {
            logger.error('Delete agent error:', error);
            throw error;
        }
    }

    sanitizeAgent(agent) {
        const sanitized = agent.toObject();
        // Remove sensitive information
        if (sanitized.bankDetails) {
            sanitized.bankDetails.accountNumber = '****' + sanitized.bankDetails.accountNumber.slice(-4);
        }
        return sanitized;
    }
}

module.exports = new AgentUseCases(); 