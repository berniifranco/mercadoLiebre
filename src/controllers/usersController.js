const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const usersFilePath = path.join(__dirname, '../data/usuarios.json');
const usuarios = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const { validationResult } = require('express-validator');

const usersController = {
    inicio: (req, res) => {
        res.render('users', {usuarios: usuarios});
    },
    detail: (req, res) => {
        let idUser = req.params.id;
        let userBus;

        for (let o of usuarios) {
            if (o.id == idUser) {
                userBus = o;
                break;
            }
        };

        res.render('userDetail', {usuario: userBus});
    },
    edit: (req, res) => {
        let idBus = req.params.id;
        let userBus;

        for (let o of usuarios) {
            if (o.id == idBus) {
                userBus = o;
                break;
            }
        };

        res.render('user-edit-form', {usuario: userBus});

    },
    update: (req, res) => {
        let idBus = req.params.id;
        let datos = req.body;
        
        for (let o of usuarios) {
            if (o.id == idBus) {
                o.nomape = datos.nomape;
                o.nomusu = datos.nomusu;
                o.email = datos.email;
                o.dom = datos.nom;
                break;
            }
        };

        res.redirect('/');
    },
    destroy: (req, res) => {
        let idX = req.params.id;
        let imageX;

        let nuevaUser = usuarios.filter(function(e) {
            return e.id != idX;
        });

        for (let o of usuarios) {
            if (o.id == idX) {
                imageX = o.foto;
                break;
            }
        };

        fs.writeFileSync(usersFilePath, JSON.stringify(nuevaUser, null, 4), 'utf-8');

        fs.unlinkSync(path.join(__dirname, '../../public/img/users', imageX));

        res.redirect('/');
    },
    login: (req, res) => {
        res.render('login')
    },
    procesoLogin: (req, res) => {
        let datos = req.body;
        let errors = validationResult(req);
        let usuarioALoguearse;

        if (errors.isEmpty()) {
            for (let o of usuarios) {
                if (o.nomusu == datos.nomusu) {
                    if (bcrypt.compareSync(datos.contra, o.contra)) {
                        usuarioALoguearse = o;
                        break;
                    }
                } 
            };

            if (usuarioALoguearse == undefined) {
                res.render('login', {error: {
                    email: {
                        msg: 'Credenciales Inválidas'
                    }
                }})
            }

            req.session.usuarioLogueado = usuarioALoguearse;

            if (datos.recordame != undefined) {
                res.cookie('recordame', req.session.usuarioLogueado.nomusu, { maxAge: ((((1000 * 60) * 60) * 24) * 365) })
            };

            res.redirect('/');

        } else {
            res.render('login', {errors: errors.mapped(), oldData: datos});
        }

    },
    logout: (req, res) => {
        req.session.destroy();
        res.clearCookie('recordame');
        res.redirect('/');
    },
    registro: (req, res) => {
        res.render('register')
    },
    storage: (req, res) => {

        let idNuevo;
        let datos = req.body;

        if (usuarios == "") {
            idNuevo = 1;
        } else {
            idNuevo = (usuarios[usuarios.length-1].id)+1;
        }

        let errors = validationResult(req);
        let mailDuplicado = null;

        if (errors.isEmpty()) {
            for (let o of usuarios) {
                if (datos.email == o.email) {
                    mailDuplicado = o;
                    res.render('register', { errormail: {
                        mail: {
                            msg: 'El E-Mail ya está registrado'
                        }
                    } });
                    break;
                }
            };

            if (mailDuplicado == null) {
                if (datos.contra == datos.confirmar) {
                    let usuarioNuevo = {
                        "id": idNuevo,
                        "nomape": datos.nomape,
                        "nomusu": datos.nomusu,
                        "email": datos.email,
                        "fecha": datos.fecha,
                        "dom": datos.dom,
                        "perfil": datos.perfil,
                        "categorias": datos.categorias,
                        "foto": req.file.filename,
                        "contra": bcrypt.hashSync(datos.contra),
                        "confirmar": bcrypt.hashSync(datos.confirmar)
                    };
            
                    usuarios.push(usuarioNuevo);
            
                    fs.writeFileSync(usersFilePath, JSON.stringify(usuarios, null, 4), 'utf-8');
            
                    res.redirect('/');
    
                } else {
                    res.render('register', { error: {
                        contra: {
                            msg: 'Las cotraseñas no coinciden'
                        }
                    } })
                };
            };

        } else {
            res.render('register', {errors: errors.mapped(), oldData: datos});
        }

    }
};

module.exports = usersController;