const express = require('express');

const exercicioController = require('../controllers/exercicioController');
const { validateId } = require('../validation/globalValidation');
const { validaExercicio } = require('../validation/exercicioValidation');
const { autenticaToken, verificaAdmin } = require('../middlewares/autenticacao');
const { validaQuantidade } = require('../middlewares/validaListagem');

const router = express.Router();

router.get('/listar-todos', verificaAdmin, exercicioController.getAllExercicios);
router.get('/', autenticaToken, validaQuantidade, exercicioController.listarExercicios);
router.get('/:id', autenticaToken, validateId, exercicioController.getExercicioById);
router.post('/', autenticaToken, validaExercicio, exercicioController.createExercicio);
router.put('/:id', autenticaToken, validateId, validaExercicio, exercicioController.updateExercicio);
router.delete('/:id', verificaAdmin, validateId, exercicioController.deleteExercicio);

module.exports = router;
