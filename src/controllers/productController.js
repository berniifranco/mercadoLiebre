const detalleProducto = require('../data/productosUltima');

const productController = {
    detalle: (req, res) => {
        let idProducto = req.params.id;
        let objProducto;

        for (let d of detalleProducto) {
            if (idProducto == d.id) {
                objProducto = d;
                break;
            }
        }

        res.render('detalleProducto', {producto: objProducto});
    },
    compras: (req, res) => {
        res.render('compras');
    },
    vender: (req, res) => {
        res.render('vender');
    },
    ofertas: (req, res) => {
        res.render('ofertas', {productos: detalleProducto});
    }
};

module.exports = productController;