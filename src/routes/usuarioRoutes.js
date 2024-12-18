const express = require('express');

const usuarioController = require('../controllers/usuarioController');
const { validateId } = require('../validation/globalValidation');
const { validaUsuario } = require('../validation/usuarioValidation');
const { verificaAdmin } = require('../middlewares/autenticacao');

const router = express.Router();

router.get('/', usuarioController.getAllUsuarios);
router.get('/:id', validateId, usuarioController.getUsuarioById);
router.post('/', validaUsuario, usuarioController.createUsuario);
router.post('/admin', verificaAdmin, validaUsuario, usuarioController.createAdmin);
router.put('/:id', verificaAdmin, validateId, validaUsuario, usuarioController.updateUsuario);
router.delete('/:id', verificaAdmin, validateId, usuarioController.deleteUsuario);

module.exports = router;
