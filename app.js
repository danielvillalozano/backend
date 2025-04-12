const http = require('http');
const express = require('express');
const path = require('path');
const fs = require('fs');
const helmet = require('helmet');
const app = express();

// Configurar el motor de vistas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Verifica que las vistas estén en esta carpeta

// Middleware para manejar datos de formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Usar directorios públicos
app.use('/bootstrap', express.static(path.join(__dirname, '/node_modules/bootstrap/dist')));
app.use(express.static(path.join(__dirname, 'public')));

// Configurar Helmet para seguridad
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                styleSrc: ["'self'", "'unsafe-inline'", "https://www.gstatic.com"],
                fontSrc: ["'self'", "data:", "http://localhost:3000"],
            },
        },
    })
);

// Cargar datos desde el archivo JSON
let datos = JSON.parse(fs.readFileSync("datos.json", "utf-8"));

// Ruta principal
app.get('/', (req, res) => {
    res.render('index', { titulo: "Listado de alumnos", listado: datos });
});

// Rutas de prácticas
app.get('/practica1', (req, res) => {
    res.render('practica01');
});

app.get('/practica2', (req, res) => {
    res.render('practica02');
});

app.get('/practica3', (req, res) => {
    res.render('practica03');
});

// Ruta para la cotización (GET)
app.get('/cotizacion', (req, res) => {
    res.render('practica02', {
        valor: req.query.valor || '',
        pinicial: req.query.pinicial || '',
        plazos: req.query.plazos || ''
    });
});

app.post('/cotizacion', (req, res) => {
    const params = {
        valor: req.body.valor,
        pinicial: req.body.pinicial,
        plazos: req.body.plazos,
    };
    res.render('practica02', params);
});

// Rutas para la tabla de multiplicar
app.get('/multiplicar', (req, res) => {
    res.render('practica1', { numero: null });
});

app.post('/multiplicar', (req, res) => {
    const numero = parseInt(req.body.numero);
    res.render('practica1', { numero });
});

// Iniciar servidor en el puerto 3000
const puerto = 80;
app.listen(puerto, () => {
    console.log(`El servidor está escuchando en el puerto ${puerto}`);
});
