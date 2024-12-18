const { body, validationResult } = require('express-validator');

const validaUsuario = [
    body('id')
        .optional()
        .isEmpty().withMessage('O campo id não pode ser enviado manualmente.'),

    body('nome')
        .notEmpty().withMessage('O nome e obrigatorio.')
        .isLength({ min: 3, max: 50 }).withMessage('O nome deve ter entre 3 e 50 caracteres.'),

    body('email')
        .notEmpty().withMessage('O email e obrigatorio.')
        .isEmail().withMessage('O email deve ser valido.'),

    body('senha')
        .notEmpty().withMessage('A senha e obrigatoria.')
        .isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres.'),

    body('isAdmin')
        .optional()
        .isEmpty().withMessage('O campo isAdmin não pode ser enviado manualmente.'),

    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validaUsuario };
