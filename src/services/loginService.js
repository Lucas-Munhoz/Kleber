const fs = require('fs').promises;
const jwt = require('jsonwebtoken');

const criarToken = (usuario) => {
    const payload = {
        id: usuario.id,
        email: usuario.email,
        isAdmin: usuario.isAdmin,
    };

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TIME });
};

exports.login = async (email, senha) => {
    try {
        const data = await fs.readFile('./db/usuarios.json', 'utf-8');
        const usuarios = JSON.parse(data);
        const usuario = usuarios.find(u => u.email === email);

        if(!usuario || usuario.senha !== senha) {
            return null;
        }

        return criarToken(usuario);
    }
    catch(error) {
        console.error("Erro ao fazer login: ", error);
        return null;
    }
}
