const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const mainRouter = require('./src/routes/mainRouter');
const productRouter = require('./src/routes/productRouter');
const usersRouter = require('./src/routes/usersRouter');
const peliculasRouter = require('./src/routes/peliculasRouter');
const recordameMiddleware = require('./src/middlewares/recordameMiddleware');
const usuarioLogueado = require('./src/middlewares/logueadoMiddleware')

app.listen(process.env.PORT || 3002, function() {
    console.log("Servidor corriendo en el puerto 3002");
});

app.use(express.static(path.join(__dirname, './public')));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(session({secret: 'Este es un secreto', resave: false, saveUninitialized: false}))
app.use(recordameMiddleware);
app.use(usuarioLogueado);

app.set('view engine', 'ejs');

app.use('/', mainRouter);
app.use('/productos', productRouter);
app.use('/users', usersRouter);
app.use('/peliculas', peliculasRouter);
app.use((req, res, next) => {
    res.status(404).render('not-found');
});