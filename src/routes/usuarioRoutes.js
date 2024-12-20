const express = require('express');

const usuarioController = require('../controllers/usuarioController');
const { validateId } = require('../validation/globalValidation');
const { validaUsuario } = require('../validation/usuarioValidation');
const { autenticaToken, verificaAdmin, verificaPropriedadeOuAdmin } = require('../middlewares/autenticacao');

const router = express.Router();

router.get('/', autenticaToken, usuarioController.getAllUsuarios);
router.get('/:id', autenticaToken, validateId, usuarioController.getUsuarioById);
router.post('/', validaUsuario, usuarioController.createUsuario);
router.post('/criar-admin', verificaAdmin, validaUsuario, usuarioController.createAdmin);
router.put('/:id', verificaPropriedadeOuAdmin, validaUsuario, usuarioController.updateUsuario);
router.put('/admin/:id', verificaAdmin, validateId, validaUsuario, usuarioController.updateUsuario);
router.delete('/:id', verificaAdmin, validateId, usuarioController.deleteUsuario);

module.exports = router;
