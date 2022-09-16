const productosUltima = require('../data/productosUltima');

const maincontroller = {
    index: (req, res) => {
        res.render('home', {productos: productosUltima});
    },
    ayuda: (req, res) => {
        res.render('ayuda')
    },
    tiendas: (req, res) => {
        res.render('tiendas')
    }
};

module.exports = maincontroller;