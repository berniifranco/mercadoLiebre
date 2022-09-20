const fs = require('fs');
const path = require('path');

const productosTotales = path.join(__dirname, '../data/productosUltima.json');
const products = JSON.parse(fs.readFileSync(productosTotales, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const maincontroller = {
    index: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productosTotales, 'utf-8'));
        res.render('home', {productos: products});
    },
    ayuda: (req, res) => {
        res.render('ayuda')
    },
    tiendas: (req, res) => {
        res.render('tiendas')
    }
};

module.exports = maincontroller;