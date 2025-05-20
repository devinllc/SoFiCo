const adminUseCases = require('../../application/useCases/adminUseCases');
const { ValidationError } = require('../../../utils/errors');
const { validationResult } = require('express-validator');

class AdminController {
    async createAdmin(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ValidationError(errors.array());
            }

            const result = await adminUseCases.createAdmin(req.user.id, req.body);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    async getAdmin(req, res, next) {
        try {
            const result = await adminUseCases.getAdmin(req.user.id);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async updateAdmin(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ValidationError(errors.array());
            }

            const result = await adminUseCases.updateAdmin(req.user.id, req.body);
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

            const result = await adminUseCases.updateStatus(req.params.userId, req.body.status);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async updatePermissions(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ValidationError(errors.array());
            }

            const result = await adminUseCases.updatePermissions(req.params.userId, req.body.permissions);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async updateAssignedRegions(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ValidationError(errors.array());
            }

            const result = await adminUseCases.updateAssignedRegions(req.user.id, req.body.regions);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async addActivityLog(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ValidationError(errors.array());
            }

            const result = await adminUseCases.addActivityLog(req.user.id, req.body);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async setupTwoFactor(req, res, next) {
        try {
            const result = await adminUseCases.setupTwoFactor(req.user.id);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async verifyTwoFactor(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ValidationError(errors.array());
            }

            const result = await adminUseCases.verifyTwoFactor(req.user.id, req.body.token);
            res.json({ verified: result });
        } catch (error) {
            next(error);
        }
    }

    async enableTwoFactor(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ValidationError(errors.array());
            }

            const result = await adminUseCases.enableTwoFactor(req.user.id, req.body.token);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async disableTwoFactor(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ValidationError(errors.array());
            }

            const result = await adminUseCases.disableTwoFactor(req.user.id, req.body.token);
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

            const result = await adminUseCases.addDevice(req.user.id, req.body);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async getAdminsByRole(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ValidationError(errors.array());
            }

            const result = await adminUseCases.getAdminsByRole(req.query.role);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async getAdminsByDepartment(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ValidationError(errors.array());
            }

            const result = await adminUseCases.getAdminsByDepartment(req.query.department);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async getAdminsByRegion(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ValidationError(errors.array());
            }

            const result = await adminUseCases.getAdminsByRegion(req.query.type, req.query.value);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async getActivityLog(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ValidationError(errors.array());
            }

            const result = await adminUseCases.getActivityLog(req.user.id, {
                startDate: req.query.startDate,
                endDate: req.query.endDate,
                module: req.query.module,
                action: req.query.action,
                limit: parseInt(req.query.limit) || 100,
                skip: parseInt(req.query.skip) || 0
            });
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async deleteAdmin(req, res, next) {
        try {
            const result = await adminUseCases.deleteAdmin(req.params.userId);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AdminController(); 