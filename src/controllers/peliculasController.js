const fs = require('fs');
const path = require('path');

let db = require('../database/models');

const peliculasController = {
    list: (req, res) => {
        db.Peliculas.findAll()
        .then(function(peliculas) {
            res.render('peliculas', {peliculas: peliculas})
        })
    },
    detail: (req, res) => {
        db.Peliculas.findByPk(req.params.id)
        .then(function(pelicula) {
            res.render('detallePelicula', {pelicula: pelicula});
        })
    }
};

module.exports = peliculasController;