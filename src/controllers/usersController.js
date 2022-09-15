const usersController = {
    inicio: (req, res) => {
        res.send('Ingrese ruta')
    },
    login: (req, res) => {
        res.render('login')
    },
    registro: (req, res) => {
        res.render('register')
    }
};

module.exports = usersController;