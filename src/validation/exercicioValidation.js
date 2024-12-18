const { body, validationResult } = require('express-validator');

const validaExercicio = [
    body('id')
        .optional()
        .isEmpty().withMessage('O campo id não pode ser enviado manualmente.'),

    body('nome')
        .notEmpty().withMessage('O campo nome é obrigatório.')
        .isString().withMessage('O campo nome deve ser uma string.')
        .isLength({ max: 50 }).withMessage('O campo nome deve ter no máximo 50 caracteres.'),

    body('tecnica')
        .notEmpty().withMessage('O campo tecnica é obrigatório.')
        .isString().withMessage('O campo tecnica deve ser uma string.')
        .isLength({ max: 50 }).withMessage('O campo tecnica deve ter no máximo 50 caracteres.'),

    body('intensidade')
        .notEmpty().withMessage('O campo intensidade é obrigatório.')
        .isString().withMessage('O campo intensidade deve ser uma string.')
        .isLength({ max: 20 }).withMessage('O campo intensidade deve ter no máximo 20 caracteres.'),

    body('volume')
        .notEmpty().withMessage('O campo volume é obrigatório.')
        .isString().withMessage('O campo volume deve ser uma string.')
        .isLength({ max: 20 }).withMessage('O campo volume deve ter no máximo 20 caracteres.'),

    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validaExercicio };