const fs = require('fs');
const path = require('path');

const productosTotales = path.join(__dirname, '../data/productosUltima.json');
const detalleProducto = JSON.parse(fs.readFileSync(productosTotales, 'utf-8'));

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
    editar: (req, res) => {
        let idProductoBuscado = req.params.id;
        let productoBuscado = null;

        for (let o of detalleProducto) {
            if (idProductoBuscado == o.id) {
                productoBuscado = o;
                break;
            }
        }

        if (productoBuscado != null) {
            res.render('product-edit-form', {producto: productoBuscado});
        };

        res.send('Producto no encontrado')
        console.log(productoBuscado)
    },
    update: (req, res) => {
        let idProducto = req.params.id;

        let datosProducto = req.body;

        for (let o of detalleProducto) {
            if (o.id == idProducto) {
                o.nombre = datosProducto.nombre;
                o.precio = datosProducto.precio;
                o.descuento = datosProducto.descuento;
                o.category = datosProducto.category;
                o.description = datosProducto.description;
                break;
            }
        }

        fs.writeFileSync(productosTotales, JSON.stringify(detalleProducto, null, " "), 'utf-8');

        res.redirect('/');
    },
    destroy: (req, res) => {
        let idProductoX = req.params.id;

        let nuevaListaProductos = detalleProducto.filter(function(e) {
            return e.id != idProductoX;
        });

        fs.writeFileSync(productosTotales, JSON.stringify(nuevaListaProductos, null, " "), 'utf-8');

        res.redirect('/');
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