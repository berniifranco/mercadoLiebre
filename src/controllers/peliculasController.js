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
    },
    drama: (req, res) => {
        db.Peliculas.findAll({
            where: {
                genre_id: 3
            }
        })
            .then(function(peliculas) {
                res.render('peliculasDrama', {peliculas: peliculas})
            })
    },
    top: (req, res) => {
        db.Peliculas.findAll({
            where: {
                rating: {[db.Sequelize.Op.gt] : 8}
            },
            order: [
                ['rating', 'DESC']
            ],
            limit: 5
        })
            .then(function(peliculas) {
                res.render('top', {peliculas: peliculas})
            })
    }
};

module.exports = peliculasController;