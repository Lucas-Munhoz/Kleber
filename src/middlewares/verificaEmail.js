const usuarioService = require('../services/usuarioService');

exports.verificaEmail = async (req, res, next) => {
    const { email } = req.body;

    try {
        const usuarios = await usuarioService.getAllUsuarios();
        const emailExiste = usuarios.some(usuario => usuario.email === email);

        if(emailExiste) {
            return res.status(400).json({ message: 'E-mail já cadastrado.' });
        }

        next();
    }
    catch(error) {
        console.error('Erro ao verificar e-mail:', error);
        res.status(500).json({ message: 'Erro interno ao verificar e-mail.' });
    }
};
