const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const mainRouter = require('./src/routes/mainRouter');
const productRouter = require('./src/routes/productRouter');
const usersRouter = require('./src/routes/usersRouter');

app.listen(process.env.PORT || 3002, function() {
    console.log("Servidor corriendo en el puerto 3002");
});

app.use(express.static(path.join(__dirname, './public')));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');

app.use('/', mainRouter);
app.use('/productos', productRouter);
app.use('/users', usersRouter);
app.use((req, res, next) => {
    res.status(404).render('not-found');
});