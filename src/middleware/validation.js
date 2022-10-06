const validation = (req, res, next) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const emailVerif = emailRegex.test(req.body.email);
    const MIN_CHAR = 5;

    if (!req.body.email) {
        return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }
    if (!emailVerif) {
        return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    if (!req.body.password) {
        return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    }
    if (req.body.password.length <= MIN_CHAR) {
        return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    return next();
};

module.exports = validation;