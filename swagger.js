const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const doc = {
    info: {
        version: "1.0.0",
        title: "WorkoutRestAPI",
        description: "API para gerenciamento de exercícios, treinos e usuários."
    },
    host: 'localhost:3000',
    basePath: '/',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        { name: 'Exercicios', description: 'Rotas relacionadas aos exercícios' },
        { name: 'Treinos', description: 'Rotas relacionadas aos treinos' },
        { name: 'Usuarios', description: 'Rotas relacionadas aos usuários' },
        { name: 'Login', description: 'Rota de autenticação para gerar o token' }
    ],
    components: {
        schemas: {
            Exercicio: {
                type: "object",
                properties: {
                    id: { type: "integer", description: "ID do exercício" },
                    nome: { type: "string", description: "Nome do exercício" },
                    grupoMuscular: { type: "string", description: "Grupo muscular trabalhado" },
                    descricao: { type: "string", description: "Descrição do exercício" },
                }
            },
            Treino: {
                type: "object",
                properties: {
                    id: { type: "integer", description: "ID do treino" },
                    nome: { type: "string", description: "Nome do treino" },
                    descricao: { type: "string", description: "Descrição do treino" },
                    exercicios: { 
                        type: "array", 
                        items: { $ref: '#/components/schemas/Exercicio' },
                        description: "Lista de exercícios no treino" 
                    }
                }
            },
            Usuario: {
                type: "object",
                properties: {
                    id: { type: "integer", description: "ID do usuário" },
                    nome: { type: "string", description: "Nome completo do usuário" },
                    email: { type: "string", format: "email", description: "Email do usuário" },
                    senha: { type: "string", description: "Senha do usuário" },
                    admin: { type: "boolean", description: "Indica se o usuário é administrador" }
                }
            },
        },
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                description: 'Autenticação via token Bearer'
            }
        }
    }
};

const outputFile = './doc/swagger-output.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./app');
});
