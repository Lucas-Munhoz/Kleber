const express = require('express');

const usuarioController = require('../controllers/usuarioController');
const { validateId } = require('../validation/globalValidation');
const { validaUsuario } = require('../validation/usuarioValidation');
const { autenticaToken, verificaAdmin, verificaPropriedadeOuAdmin } = require('../middlewares/autenticacao');
const { verificaEmail } = require('../middlewares/verificaEmail');

const router = express.Router();

router.get('/', autenticaToken, usuarioController.getAllUsuarios);
router.get('/:id', autenticaToken, validateId, usuarioController.getUsuarioById);
router.post('/', validaUsuario, verificaEmail, usuarioController.createUsuario);
router.post('/criar-admin', verificaAdmin, validaUsuario, verificaEmail, usuarioController.createAdmin);
router.put('/:id', verificaPropriedadeOuAdmin, validaUsuario, verificaEmail, usuarioController.updateUsuario);
router.put('/admin/:id', verificaAdmin, validateId, validaUsuario, verificaEmail, usuarioController.updateUsuario);
router.delete('/:id', verificaAdmin, validateId, usuarioController.deleteUsuario);

module.exports = router;
