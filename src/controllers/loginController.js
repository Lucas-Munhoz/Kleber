const loginService = require('../services/loginService');

exports.login = async (req, res) => {
    const { email, senha } = req.body;

    const token = await loginService.login(email, senha);
    
    if(token == null){
        return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    return res.status(200).json({ token });

    /* 
    #swagger.tags = ['Login']
    #swagger.summary = 'Realiza o login e retorna um token'
    #swagger.responses[200] = {
        schema: {'token':'Bearer string'}
    }
    #swagger.responses[401] = {
        description: "Acesso negado"
    }
    #swagger.responses[500] = {
        description: "Erro interno"
    }
    */
}