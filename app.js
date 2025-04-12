const http= require('http');
const express = require('express');
const fs = require('fs');
const path = require('path')

//generar objeto principal
const app = express();
app.set('view engine','ejs')

//usar direcctorios publicos
app.use('/bootstrap',express.static(__dirname+'/node_modules/bootstrap/dist'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
app.use(express.json());


//declarar un array de objetos
let datos=JSON.parse(fs.readFileSync('datos.json','utf8'));
let productos=JSON.parse(fs.readFileSync('productos.json','utf8'));
let alumnos=JSON.parse(fs.readFileSync('alumnos.json','utf8'));


//primer peticion por el metodo get
app.get('/',(req,res)=>{
    res.render('index',{titulo:"Listado de alumnos",listado:datos})
})

app.get('/p01',(req,res)=>{
    res.render('p01',{numero:""});

})
app.get('/p02',(req,res)=>{
    res.render('p02');
})
app.get('/p03',(req,res)=>{
    res.render('p03');
});


app.get('/cotizacion',(req,res)=>{
    const params ={
        valor : req.query.valor,
        pinicial : req.query.pinicial,
        plazos : req.query.plazos,
        
    }
    res.render('p02',params);
})

app.get('/recibo',(req,res)=>{
    const params ={
        puesto : req.query.puesto,
        nombre : req.query.nombre,
        num : req.query.num,
        nivel : req.query.nivel,
        dias : req.query.dias
        
    }
    res.render('p03',params);
})
app.get('/papeleria', (req, res) => {
    let productos = [];
    res.render('preExamen', { tipo: '', productos });
});

        app.post('/papeleria', (req, res) => {
            const tipoSeleccionado = req.body.tipo;

            let productosFiltrados = productos;
            
            if (tipoSeleccionado) {
                productosFiltrados = productos.filter(p => p.tipo == tipoSeleccionado);
            }
            res.render('preExamen', { tipo: tipoSeleccionado, productos:productosFiltrados });
        });


        app.post('/siia', (req, res) => {
            const nivel = Number(req.body.nivel);
            const turno = Number(req.body.turno);
            const tipo = req.body.tipo;
            let AlumnosFiltrados = alumnos; 
        
            if (nivel !== 4) {
                AlumnosFiltrados = AlumnosFiltrados.filter(p => p.nivel === nivel);
            }
            let AlumnosFinales=AlumnosFiltrados; 
            if (turno !== 3) {
                AlumnosFinales = AlumnosFiltrados.filter(p => Number(p.turno) === turno);
            }
            res.render('examen', {nivel,turno,tipo,alumnos:AlumnosFinales});
        });
        

        app.get('/siia', (req, res) => {
            const params={
                alumnos:[], 
                nivel : req.query.nivel,
                turno : req.query.turno,
                tipo :req.query.tipo
            }
            res.render('examen', params);
        });

app.post('/p01',(req,res)=>{
    //parametros para recibir los datos
    const params={

        numero:req.body.numero

    }
    res.render('p01', params)
})

app.post('/cotizacion',(req,res)=>{
    //parametros para recibir los datos
    const params={
            //body : cuando los datos vienen de un formulario por el metodo post
    //     : usa libreria

        valor:req.body.valor,
        pinicial:req.body.pinicial,
        plazos:req.body.plazos

    }
    res.render('p02', params)});

    
    app.post('/recibo',(req,res)=>{
        const params={

    
        puesto : req.body.puesto,
        nombre : req.body.nombre,
        num : req.body.num,
        nivel : req.body.nivel,
        dias : req.body.dias
    
        }
        res.render('p03', params)});

    
        const PORT = 4000; // Cambiar a un puerto diferente
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
        });