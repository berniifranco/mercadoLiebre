const maincontroller = {
    index: (req, res) => {
        res.render('home');
    },
    ayuda: (req, res) => {
        res.render('ayuda')
    },
    tiendas: (req, res) => {
        res.render('tiendas')
    }
};

module.exports = maincontroller;