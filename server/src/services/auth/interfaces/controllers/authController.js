const { validationResult } = require('express-validator');
const authUseCases = require('../../application/useCases/authUseCases');
const { ValidationError } = require('../../../utils/errors');

class AuthController {
    async register(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ValidationError(errors.array());
            }

            const result = await authUseCases.register(req.body);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ValidationError(errors.array());
            }

            const { email, password } = req.body;
            const result = await authUseCases.login(email, password);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async verifyMFA(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ValidationError(errors.array());
            }

            const { userId, token } = req.body;
            const result = await authUseCases.verifyMFA(userId, token);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async setupMFA(req, res, next) {
        try {
            const result = await authUseCases.setupMFA(req.user.id);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async enableMFA(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ValidationError(errors.array());
            }

            const { token } = req.body;
            const result = await authUseCases.enableMFA(req.user.id, token);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async disableMFA(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ValidationError(errors.array());
            }

            const { token } = req.body;
            const result = await authUseCases.disableMFA(req.user.id, token);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async refreshToken(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ValidationError(errors.array());
            }

            const { refreshToken } = req.body;
            const result = await authUseCases.refreshToken(refreshToken);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.body;
            const result = await authUseCases.logout(req.user.id, refreshToken);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async logoutAll(req, res, next) {
        try {
            const result = await authUseCases.logoutAll(req.user.id);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AuthController(); 