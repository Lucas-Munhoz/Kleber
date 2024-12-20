const express = require('express');

const treinoController = require('../controllers/treinoController');
const { validateId } = require('../validation/globalValidation');
const { validaTreino } = require('../validation/treinoValidation');
const { autenticaToken, verificaAdmin } = require('../middlewares/autenticacao');
const { verificaExercicios } = require('../middlewares/verificaExercicios');

const router = express.Router();

router.get('/listar-todos', verificaAdmin, treinoController.getAllTreinos);
router.get('/', autenticaToken, treinoController.listarTreinos);
router.get('/:id', autenticaToken, validateId, treinoController.getTreinoById);
router.post('/', autenticaToken, validaTreino, verificaExercicios, treinoController.createTreino);
router.put('/:id', autenticaToken, validateId, validaTreino, verificaExercicios, treinoController.updateTreino);
router.delete('/:id', verificaAdmin, validateId, treinoController.deleteTreino);

module.exports = router;
