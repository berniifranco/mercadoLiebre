function usuarioLogueado (req, res, next) {

if (req.session.usuarioLogueado != undefined) {
    res.locals.usuario = req.session.usuarioLogueado
}

next();

};

module.exports = usuarioLogueado;