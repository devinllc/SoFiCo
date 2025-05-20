const { validationResult } = require('express-validator');
const agentUseCases = require('../../application/useCases/agentUseCases');
const { ValidationError } = require('../../../utils/errors');

class AgentController {
    async createAgent(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ValidationError(errors.array());
            }

            const result = await agentUseCases.createAgent(req.user.id, req.body);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    async getAgent(req, res, next) {
        try {
            const result = await agentUseCases.getAgent(req.user.id);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async updateAgent(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ValidationError(errors.array());
            }

            const result = await agentUseCases.updateAgent(req.user.id, req.body);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async updateStatus(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ValidationError(errors.array());
            }

            const { status } = req.body;
            const result = await agentUseCases.updateStatus(req.user.id, status);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async updatePerformance(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ValidationError(errors.array());
            }

            const { loanAmount, success } = req.body;
            const result = await agentUseCases.updatePerformance(req.user.id, loanAmount, success);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async updateCommission(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ValidationError(errors.array());
            }

            const result = await agentUseCases.updateCommission(req.user.id, req.body);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async updateServiceArea(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ValidationError(errors.array());
            }

            const result = await agentUseCases.updateServiceArea(req.user.id, req.body);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async updateAssignedArea(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ValidationError(errors.array());
            }

            const { coordinates } = req.body;
            const result = await agentUseCases.updateAssignedArea(req.user.id, coordinates);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async submitDocument(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ValidationError(errors.array());
            }

            const result = await agentUseCases.submitDocument(req.user.id, req.body);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async verifyDocument(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ValidationError(errors.array());
            }

            const { documentType } = req.params;
            const { verified } = req.body;
            const result = await agentUseCases.verifyDocument(req.user.id, documentType, verified);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async updateBankDetails(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ValidationError(errors.array());
            }

            const result = await agentUseCases.updateBankDetails(req.user.id, req.body);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async verifyBankDetails(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ValidationError(errors.array());
            }

            const { verified } = req.body;
            const result = await agentUseCases.verifyBankDetails(req.user.id, verified);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async updateTrainingStatus(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ValidationError(errors.array());
            }

            const { status } = req.body;
            const result = await agentUseCases.updateTrainingStatus(req.user.id, status);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async addDevice(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ValidationError(errors.array());
            }

            const result = await agentUseCases.addDevice(req.user.id, req.body);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async getAgentsByStatus(req, res, next) {
        try {
            const { status } = req.query;
            const result = await agentUseCases.getAgentsByStatus(status);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async findNearbyAgents(req, res, next) {
        try {
            const { coordinates, maxDistance } = req.query;
            const result = await agentUseCases.findNearbyAgents(
                JSON.parse(coordinates),
                parseInt(maxDistance)
            );
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async findAgentsByServiceArea(req, res, next) {
        try {
            const { city, state } = req.query;
            const result = await agentUseCases.findAgentsByServiceArea(city, state);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async deleteAgent(req, res, next) {
        try {
            const result = await agentUseCases.deleteAgent(req.user.id);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AgentController(); 