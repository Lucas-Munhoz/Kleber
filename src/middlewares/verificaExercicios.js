const exercicioService = require('../services/exercicioService');

exports.verificaExercicios = async (req, res, next) => {
    try {
        const { exercicios } = req.body;

        if(!exercicios || !Array.isArray(exercicios) || exercicios.length === 0) {
            return res.status(400).json({ mensagem: 'O campo exercicios deve ser um array com pelo menos 1 elemento.' });
        }

        const exerciciosCadastrados = await exercicioService.getAllExercicios();
        const idsCadastrados = exerciciosCadastrados.map(exercicio => exercicio.id);
        const idsInvalidos = exercicios.filter(id => !idsCadastrados.includes(id));

        if(idsInvalidos.length > 0) {
            return res.status(400).json({ mensagem: `Os seguintes IDs de exercícios não estão cadastrados: ${idsInvalidos.join(', ')}` });
        }

        next();
    }
    catch(error) {
        console.error('Erro ao verificar exercícios:', error);
        res.status(500).json({ mensagem: 'Erro interno ao verificar exercícios.' });
    }
};

