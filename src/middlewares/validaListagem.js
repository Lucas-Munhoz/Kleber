exports.validaQuantidade = (req, res, next) => {
    const { quantidade } = req.query;

    if(quantidade && ![5, 10, 30].includes(Number(quantidade))) {
        return res.status(400).json({ mensagem: 'Quantidade deve ser 5, 10 ou 30.' });
    }

    next();
};