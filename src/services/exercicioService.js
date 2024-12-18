const fs = require('fs').promises;

exports.getAllExercicios = async () => {
    try {
        const data = await fs.readFile('./db/exercicios.json', 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Erro ao ler exercicios.json:', error);
        return [];
    }
};

exports.getExercicioById = async (id) => {
    try {
        const exercicios = await this.getAllExercicios();
        return exercicios.find(exercicio => exercicio.id === id) || null;
    } catch (error) {
        console.error('Erro ao buscar exercicio por ID:', error);
        return null;
    }
};

exports.createExercicio = async (exercicio) => {
    try {
        const exercicios = await this.getAllExercicios();
        const id = exercicios.length > 0 ? exercicios[exercicios.length - 1].id + 1 : 1;
        const novoExercicio = { id, ...exercicio };

        exercicios.push(novoExercicio);
        await fs.writeFile('./db/exercicios.json', JSON.stringify(exercicios));

        return novoExercicio;
    } catch (error) {
        console.error('Erro ao criar exercicio:', error);
        return null;
    }
};

exports.updateExercicio = async (id, exercicioAtualizado) => {
    try {
        const exercicios = await this.getAllExercicios();
        const index = exercicios.findIndex(exercicio => exercicio.id === id);

        if (index === -1) return null;

        exercicios[index] = { ...exercicios[index], ...exercicioAtualizado };
        await fs.writeFile('./db/exercicios.json', JSON.stringify(exercicios));

        return exercicios[index];
    } catch (error) {
        console.error('Erro ao atualizar exercicio:', error);
        return null;
    }
};

exports.deleteExercicio = async (id) => {
    try {
        const exercicios = await this.getAllExercicios();
        const index = exercicios.findIndex(exercicio => exercicio.id === id);

        if (index === -1) return null;

        const [exercicioDeletado] = exercicios.splice(index, 1);
        await fs.writeFile('./db/exercicios.json', JSON.stringify(exercicios));

        return exercicioDeletado;
    } catch (error) {
        console.error('Erro ao deletar exercicio:', error);
        return null;
    }
};
