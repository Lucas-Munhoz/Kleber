const { param, validationResult } = require('express-validator');

const validateId = [
    param('id')
        .isInt({ min: 1 }).withMessage('ID do usuário deve ser um inteiro positivo.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateId }