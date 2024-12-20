const jwt = require('jsonwebtoken');

exports.autenticaToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({ message: 'Acesso negado' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
        if(err) {
            if(err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expirado!' });
            }
            return res.status(403).json({ message: 'Token inválido!' });
        }

        req.usuario = usuario;
        next();
    })
}

exports.verificaAdmin = (req, res, next) => {
    this.autenticaToken(req, res, () => {
        if(!req.usuario.isAdmin) {
            return res.status(403).json({ message: 'Acesso negado: Rota exclusiva para ADMINISTRADORES!!!' });
        }

        next();
    });
};

exports.verificaPropriedadeOuAdmin = (req, res, next) => {
    this.autenticaToken(req, res, () => {
        const {id} = req.params;

        if(req.usuario.isAdmin || req.usuario.id === parseInt(id, 10)) {
            return next();
        }

        return res.status(403).json({ message: 'Acesso negado. Você não tem permissão para modificar esse usuario!!!' });
    });
};
