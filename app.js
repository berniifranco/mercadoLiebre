const express = require('express');
const app = express();
const path = require('path');

/*
app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});
*/

app.listen(process.env.PORT || 3002, function() {
    console.log("Servidor corriendo en el puerto 3002");
});

app.use(express.static(path.join(__dirname, './public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './views/home.html'));
});

app.get('/help', (req, res) => {
    res.sendFile(path.join(__dirname, './views/ayuda.html'));
});

app.get('/compras', (req, res) => {
    res.sendFile(path.join(__dirname, './views/compras.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, './views/login.html'));
});

app.get('/ofertas', (req, res) => {
    res.sendFile(path.join(__dirname, './views/ofertas.html'));
});

app.get('/registro', (req, res) => {
    res.sendFile(path.join(__dirname, './views/registro.html'));
});

app.get('/tiendas', (req, res) => {
    res.sendFile(path.join(__dirname, './views/tiendas.html'));
});

app.get('/vender', (req, res) => {
    res.sendFile(path.join(__dirname, './views/vender.html'));
});