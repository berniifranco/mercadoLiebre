const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/usuarios.json');
const usuarios = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const { validationResult } = require('express-validator');

const usersController = {
    inicio: (req, res) => {
        res.send('Ingrese ruta')
    },
    login: (req, res) => {
        res.render('login')
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

        if (errors.isEmpty()) {
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
                "contra": datos.contra,
                "confirmar": datos.confirmar
            };
    
            usuarios.push(usuarioNuevo);
    
            fs.writeFileSync(usersFilePath, JSON.stringify(usuarios, null, 4), 'utf-8');
    
            res.redirect('/');
        } else {
            res.render('register', {errors: errors.mapped(), oldData: req.body});
        }

    }
};

module.exports = usersController;