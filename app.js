const express = require('express');
const app = express();
const path = require('path');
const mainRouter = require('./src/routes/mainRouter');
const productRouter = require('./src/routes/productRouter');
const usersRouter = require('./src/routes/usersRouter');

/*
app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});
*/

app.listen(process.env.PORT || 3002, function() {
    console.log("Servidor corriendo en el puerto 3002");
});

app.use(express.static(path.join(__dirname, './public')));

app.set('view engine', 'ejs');

app.use('/', mainRouter);
app.use('/compras', productRouter);
app.use('/users', usersRouter); 