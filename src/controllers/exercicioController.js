const exercicioService = require('../services/exercicioService');

exports.getAllExercicios = async (req, res) => {
    const exercicios = await exercicioService.getAllExercicios();
    res.status(200).json(exercicios);

    /* 
    #swagger.tags = ['Exercicios']
    #swagger.summary = 'Retorna todos os exercicios'
    #swagger.responses[200] = {
        description: 'Exercicios encontrados com sucesso',
        content: {
            "application/json": {
                schema: {
                    type: "array",
                    items: { $ref: '#/components/schemas/Exercicio' }
                }
            }
        }
    }
    */
};

exports.getExercicioById = async (req, res) => {
    const exercicio = await exercicioService.getExercicioById(parseInt(req.params.id, 10));

    if(!exercicio) {
        return res.status(404).json({ message: 'Exercicio nao encontrado.' });
    }

    res.status(200).json(exercicio);

    /* 
    #swagger.tags = ['Exercicios']
    #swagger.summary = 'Busca um exercicio pelo ID'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do exercicio',
        required: true,
        schema: { type: 'integer' }
    }
    #swagger.responses[200] = {
        description: 'Exercicio encontrado com sucesso',
        schema: { $ref: '#/components/schemas/Exercicio' }
    }
    #swagger.responses[404] = {
        description: 'Exercicio nao encontrado.',
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Exercicio nao encontrado.' }
                    }
                }
            }
        }
    }
    */
};

exports.createExercicio = async (req, res) => {
    const novoExercicio = await exercicioService.createExercicio(req.body);

    if(!novoExercicio) {
        return res.status(400).json({ message: 'Erro ao criar exercicio.' });
    }

    res.status(201).json(novoExercicio);

    /* 
    #swagger.tags = ['Exercicios']
    #swagger.summary = 'Cria um novo exercicio'
    #swagger.parameters['exercicio'] = {
        in: 'body',
        description: 'Informacoes do exercicio',
        required: true,
        schema: { $ref: '#/components/schemas/Exercicio' }
    }
    #swagger.responses[201] = {
        description: 'Exercicio criado com sucesso',
        schema: { $ref: '#/components/schemas/Exercicio' }
    }
    #swagger.responses[400] = {
        description: 'Erro ao criar exercicio.',
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Erro ao criar exercicio.' }
                    }
                }
            }
        }
    }
    */
};

exports.updateExercicio = async (req, res) => {
    const exercicioAtualizado = await exercicioService.updateExercicio(parseInt(req.params.id, 10), req.body);

    if(!exercicioAtualizado) {
        return res.status(400).json({ message: 'Erro ao atualizar exercicio.' });
    }

    res.status(200).json(exercicioAtualizado);

    /* 
    #swagger.tags = ['Exercicios']
    #swagger.summary = 'Atualiza um exercicio pelo ID'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do exercicio',
        required: true,
        schema: { type: 'integer' }
    }
    #swagger.parameters['exercicio'] = {
        in: 'body',
        description: 'Novos dados do exercicio',
        required: true,
        schema: { $ref: '#/components/schemas/Exercicio' }
    }
    #swagger.responses[200] = {
        description: 'Exercicio atualizado com sucesso',
        schema: { $ref: '#/components/schemas/Exercicio' }
    }
    */
};

exports.deleteExercicio = async (req, res) => {
    const exercicioDeletado = await exercicioService.deleteExercicio(parseInt(req.params.id, 10));

    if(!exercicioDeletado) {
        return res.status(400).json({ message: 'Erro ao deletar exercicio.' });
    }

    res.status(200).json({ message: 'Exercicio deletado com sucesso.' });

    /* 
    #swagger.tags = ['Exercicios']
    #swagger.summary = 'Deleta um exercicio pelo ID'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do exercicio',
        required: true,
        schema: { type: 'integer' }
    }
    #swagger.responses[200] = {
        description: 'Exercicio deletado com sucesso',
        schema: {
            type: 'object',
            properties: {
                message: { type: 'string', example: 'Exercicio deletado com sucesso.' }
            }
        }
    }
    */
};
