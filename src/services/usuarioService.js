const fs = require('fs').promises;

exports.getAllUsuarios = async () => {
    try {
        const data = await fs.readFile('./db/usuarios.json', 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Erro ao ler usuarios.json:', error);
        return [];
    }
};

exports.getUsuarioById = async (id) => {
    try {
        const usuarios = await this.getAllUsuarios();
        return usuarios.find(usuario => usuario.id === id) || null;
    } catch (error) {
        console.error('Erro ao buscar usuario por ID:', error);
        return null;
    }
};

exports.createUsuario = async (usuario) => {
    try {
        const usuarios = await this.getAllUsuarios();
        const id = usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1;
        const novoUsuario = { id, ...usuario, isAdmin: false };

        usuarios.push(novoUsuario);
        await fs.writeFile('./db/usuarios.json', JSON.stringify(usuarios));

        return novoUsuario;
    } catch (error) {
        console.error('Erro ao criar usuario:', error);
        return null;
    }
};

exports.createAdmin = async (usuario) => {
    try {
        const usuarios = await this.getAllUsuarios();
        const id = usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1;
        const novoUsuario = { id, ...usuario, isAdmin: true };

        usuarios.push(novoUsuario);
        await fs.writeFile('./db/usuarios.json', JSON.stringify(usuarios));

        return novoUsuario;
    } catch (error) {
        console.error('Erro ao criar administrador:', error);
        return null;
    }
};

exports.updateUsuario = async (id, usuarioAtualizado) => {
    try {
        const usuarios = await this.getAllUsuarios();
        const index = usuarios.findIndex(usuario => usuario.id === id);

        if (index === -1) return null;

        usuarios[index] = { ...usuarios[index], ...usuarioAtualizado };
        await fs.writeFile('./db/usuarios.json', JSON.stringify(usuarios));

        return usuarios[index];
    } catch (error) {
        console.error('Erro ao atualizar usuario:', error);
        return null;
    }
};

exports.deleteUsuario = async (id) => {
    try {
        const usuarios = await this.getAllUsuarios();
        const index = usuarios.findIndex(usuario => usuario.id === id);

        if (index === -1) return null;

        const [usuarioDeletado] = usuarios.splice(index, 1);
        await fs.writeFile('./db/usuarios.json', JSON.stringify(usuarios));

        return usuarioDeletado;
    } catch (error) {
        console.error('Erro ao deletar usuario:', error);
        return null;
    }
};
