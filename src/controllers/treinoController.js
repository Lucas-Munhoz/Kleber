const treinoService = require('../services/treinoService');

exports.getAllTreinos = async (req, res) => {
    const treinos = await treinoService.getAllTreinos();
    res.status(200).json(treinos);

    /* 
    #swagger.tags = ['Treinos']
    #swagger.summary = 'Retorna todos os treinos'
    #swagger.responses[200] = {
        description: 'Treinos encontrados com sucesso',
        content: {
            "application/json": {
                schema: {
                    type: "array",
                    items: { $ref: '#/components/schemas/Treino' }
                }
            }
        }
    }
    */
};

exports.listarTreinos = async (req, res) => {
    const { pagina = 1, quantidade = 10 } = req.query;

    if (![5, 10, 30].includes(Number(quantidade))) {
        return res.status(400).json({ mensagem: 'Quantidade deve ser 5, 10 ou 30.' });
    }

    const treinos = await treinoService.listarTreinos(Number(pagina), Number(quantidade));
    res.status(200).json(treinos);

    /* 
    #swagger.tags = ['Treinos']
    #swagger.summary = 'Lista treinos com paginação'
    #swagger.responses[200] = {
        description: 'Treinos listados com sucesso',
        schema: {
            type: "array",
            items: { $ref: '#/components/schemas/Treino' }
        }
    }
    */
};

exports.getTreinoById = async (req, res) => {
    const treino = await treinoService.getTreinoById(parseInt(req.params.id, 10));

    if (!treino) {
        return res.status(404).json({ mensagem: 'Treino não encontrado.' });
    }

    res.status(200).json(treino);

    /* 
    #swagger.tags = ['Treinos']
    #swagger.summary = 'Busca um treino pelo ID'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do treino',
        required: true,
        schema: { type: 'integer' }
    }
    #swagger.responses[200] = {
        description: 'Treino encontrado com sucesso',
        schema: { $ref: '#/components/schemas/Treino' }
    }
    */
};

exports.createTreino = async (req, res) => {
    const novoTreino = await treinoService.createTreino(req.body);

    if (!novoTreino) {
        return res.status(400).json({ mensagem: 'Erro ao criar treino.' });
    }

    res.status(201).json(novoTreino);

    /* 
    #swagger.tags = ['Treinos']
    #swagger.summary = 'Cria um novo treino'
    #swagger.parameters['treino'] = {
        in: 'body',
        description: 'Informações do treino',
        required: true,
        schema: { $ref: '#/components/schemas/Treino' }
    }
    #swagger.responses[201] = {
        description: 'Treino criado com sucesso',
        schema: { $ref: '#/components/schemas/Treino' }
    }
    */
};

exports.updateTreino = async (req, res) => {
    const treinoAtualizado = await treinoService.updateTreino(parseInt(req.params.id, 10), req.body);

    if (!treinoAtualizado) {
        return res.status(400).json({ mensagem: 'Erro ao atualizar treino.' });
    }

    res.status(200).json(treinoAtualizado);

    /* 
    #swagger.tags = ['Treinos']
    #swagger.summary = 'Atualiza um treino pelo ID'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do treino',
        required: true,
        schema: { type: 'integer' }
    }
    #swagger.parameters['treino'] = {
        in: 'body',
        description: 'Novos dados do treino',
        required: true,
        schema: { $ref: '#/components/schemas/Treino' }
    }
    #swagger.responses[200] = {
        description: 'Treino atualizado com sucesso',
        schema: { $ref: '#/components/schemas/Treino' }
    }
    */
};

exports.deleteTreino = async (req, res) => {
    const treinoDeletado = await treinoService.deleteTreino(parseInt(req.params.id, 10));

    if (!treinoDeletado) {
        return res.status(400).json({ mensagem: 'Erro ao deletar treino.' });
    }

    res.status(200).json({ mensagem: 'Treino deletado com sucesso.' });

    /* 
    #swagger.tags = ['Treinos']
    #swagger.summary = 'Deleta um treino pelo ID'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do treino',
        required: true,
        schema: { type: 'integer' }
    }
    #swagger.responses[200] = {
        description: 'Treino deletado com sucesso',
        schema: {
            type: 'object',
            properties: {
                mensagem: { type: 'string', example: 'Treino deletado com sucesso.' }
            }
        }
    }
    */
};
