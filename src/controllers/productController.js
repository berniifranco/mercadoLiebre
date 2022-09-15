const productController = {
    productos: (req, res) => {
        res.send('Ingrese seccion');
    },
    compras: (req, res) => {
        res.render('compras');
    },
    vender: (req, res) => {
        res.render('vender');
    },
    ofertas: (req, res) => {
        res.render('ofertas');
    }
};

module.exports = productController;