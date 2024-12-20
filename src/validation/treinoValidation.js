const { body, validationResult } = require('express-validator');

const validaTreino = [
    body('id')
        .optional()
        .isEmpty().withMessage('O campo id não pode ser enviado manualmente.'),

    body('tipo')
        .notEmpty().withMessage('O campo tipo é obrigatório.')
        .isString().withMessage('O campo tipo deve ser uma string.')
        .isLength({ max: 50 }).withMessage('O campo tipo deve ter no máximo 50 caracteres.'),

    body('descricao')
        .notEmpty().withMessage('O campo descricao é obrigatório.')
        .isString().withMessage('O campo descricao deve ser uma string.')
        .isLength({ max: 255 }).withMessage('O campo descricao deve ter no máximo 255 caracteres.'),

    body('tempo-estimado')
        .notEmpty().withMessage('O campo tempo-estimado é obrigatório.')
        .isString().withMessage('O campo tempo-estimado deve ser uma string.')
        .matches(/^\d{2}:\d{2}$/).withMessage('O campo tempo-estimado deve estar no formato HH:MM.'),

    body('exercicios')
        .isArray({ min: 1 }).withMessage('O campo exercicios deve ser um array com pelo menos 1 elemento.')
        .custom((value) => value.every(Number.isInteger)).withMessage('Todos os elementos do campo exercicios devem ser números inteiros.'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validaTreino };
