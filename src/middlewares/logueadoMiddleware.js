function logueado (req, res, next) {
    if (!req.session.usuarioLogueado) {
        next();
    } else {
        res.send('Ya estas logueado');
    }
};

module.exports = logueado;