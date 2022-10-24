const fs = require('fs');
const path = require('path');

const productosTotales = path.join(__dirname, '../data/productosUltima.json');
const detalleProducto = JSON.parse(fs.readFileSync(productosTotales, 'utf-8'));

function generarIdProd () {
    let idProdNuevo;
    if (detalleProducto.length != 0) {
        idProdNuevo = (detalleProducto[detalleProducto.length-1].id)+1;
    } else {
        idProdNuevo = 1;
    };
    return idProdNuevo;
}

const { validationResult } = require('express-validator');

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
                o.precio = parseInt(datosProducto.precio);
                o.descuento = parseInt(datosProducto.descuento);
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
        let imageX;

        let nuevaListaProductos = detalleProducto.filter(function(e) {
            return e.id != idProductoX;
        });

        for (o of detalleProducto) {
            if (o.id == idProductoX) {
                imageX = o.rutaImg;
                break;
            }
        };

        fs.unlinkSync(path.join(__dirname, '../../public/img/products', imageX));

        fs.writeFileSync(productosTotales, JSON.stringify(nuevaListaProductos, null, " "), 'utf-8');

        res.redirect('/');
    },
    compras: (req, res) => {
        res.render('compras');
    },
    vender: (req, res) => {
        res.render('vender');
    },
    guardar: (req, res) => {
        let datos = req.body;

        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let nuevoProducto = {
                "id": generarIdProd(),
                "nombre": datos.nombre,
                "precio": parseInt(datos.precio),
                "descuento": parseInt(datos.descuento),
                "category": datos.category,
                "description": datos.description,
                "rutaImg": req.file.filename
            };
    
            detalleProducto.push(nuevoProducto);
    
            fs.writeFileSync(productosTotales, JSON.stringify(detalleProducto, null, 4), 'utf-8');
    
            res.redirect('/');
        } else {
            res.render('vender', {errors: errors.mapped(), oldData: req.body});
        }

    },
    ofertas: (req, res) => {
        res.render('ofertas', {productos: detalleProducto});
    },
    listado: (req, res) => {
        res.render('productos', {productos: detalleProducto});
    }
};

module.exports = productController;