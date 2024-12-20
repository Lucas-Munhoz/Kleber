const fs = require('fs').promises;

exports.getAllTreinos = async () => {
    try {
        const data = await fs.readFile('./db/treinos.json', 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Erro ao ler treinos.json:', error);
        return [];
    }
};

exports.getTreinoById = async (id) => {
    try {
        const treinos = await this.getAllTreinos();
        return treinos.find(treino => treino.id === id) || null;
    } catch (error) {
        console.error('Erro ao buscar treino por ID: ', error);
        return null;
    }
};

exports.createTreino = async (treino) => {
    try {
        const treinos = await this.getAllTreinos();
        const id = treinos.length > 0 ? treinos[treinos.length - 1].id + 1 : 1;
        const novoTreino = { id, ...treino };

        treinos.push(novoTreino);
        await fs.writeFile('./db/treinos.json', JSON.stringify(treinos));

        return novoTreino;
    } catch (error) {
        console.error('Erro ao criar treino: ', error);
        return null;
    }
};

exports.updateTreino = async (id, treinoAtualizado) => {
    try {
        const treinos = await this.getAllTreinos();
        const index = treinos.findIndex(treino => treino.id === id);

        if (index === -1) return null;

        treinos[index] = { ...treinos[index], ...treinoAtualizado };
        await fs.writeFile('./db/treinos.json', JSON.stringify(treinos));

        return treinos[index];
    } catch (error) {
        console.error('Erro ao atualizar treino: ', error);
        return null;
    }
};

exports.deleteTreino = async (id) => {
    try {
        const treinos = await this.getAllTreinos();
        const index = treinos.findIndex(treino => treino.id === id);

        if (index === -1) return null;

        const [treinoDeletado] = treinos.splice(index, 1);
        await fs.writeFile('./db/treinos.json', JSON.stringify(treinos));

        return treinoDeletado;
    } catch (error) {
        console.error('Erro ao deletar treino: ', error);
        return null;
    }
};
