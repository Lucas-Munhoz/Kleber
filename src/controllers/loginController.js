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
        #swagger.summary = 'Realiza o login e retorna um token JWT'
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            email: { type: "string", example: "usuario@exemplo.com" },
                            senha: { type: "string", example: "123456" }
                        },
                        required: ["email", "senha"]
                    }
                }
            }
        }
        #swagger.responses[200] = {
            description: "Login realizado com sucesso",
            content: {
                "application/json": {
                    schema: { token: { type: "string", example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" } }
                }
            }
        }
        #swagger.responses[401] = {
            description: "Credenciais inválidas"
        }
        #swagger.responses[500] = {
            description: "Erro interno"
        }
    */
};