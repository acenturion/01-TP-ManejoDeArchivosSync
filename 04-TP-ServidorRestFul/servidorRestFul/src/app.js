var express = require('express');
var alumnoController = require('./controller/alumnoController.js');

const app = express();
const port = 8080;

app.use(express.json()) 

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})

/* GET */

/*Obtengo un array con todos los alumnos
http://localhost:8080/api/alumnos/
*/
app.get('/api/alumnos', (req, res) =>{
    
    alumnoController.getAlumnos();

    res.json(alumnoController.getAlumnos())
})

/*Obtengo un objeto de alumno por el parametro DNI
http://localhost:8080/api/alumnos/11222333
*/
app.get('/api/alumnos/:dni', (req, res) =>{
    let alumno = alumnoController.getAlumno( req.params.dni )

    res.json(alumno)
})


/*Obtengo un array con todos los alumnos que cumplan un rango de edad
"min": edad minima
"max" edad maxima
localhost:8080/api/alumno?min=30&max=50
*/
app.get('/api/alumno', (req, res) =>{
   console.log(req.query);

   let result = alumnoController.getAlumnosByEdad(req.query.min,req.query.max)
    res.json(result)
})

/* POST */

/* Agrego un nuevo alumno al archivo, se espera un objeto con lo datos de alumno

{
	"dni": "99777888",
	"nombre": "Julio",
	"apellido": "Cesar",
	"edad": "46"
}

*/
app.post('/api/alumnos/', (req, res) =>{
    let alumno = req.body
    let result = alumnoController.setAlumno(alumno);

    res.json({
        result: result,
        data: req.body
    })
})


/*
Modifico un alumno existente en la base a travez del parametro ID, se espera que el body sea un nuevo alumno

localhost:8080/api/alumnos/1
{
    "dni": 11222333,
    "nombre": "Alejandro",
    "apellido": "Nuevo",
    "edad": 27
}
*/
app.post('/api/alumnos/:id', (req, res) =>{
    let result = alumnoController.modificarAlumno( req.params.id, req.body )
    res.json(result)
})

/* DELETE */
/*
Elimino un alumno existente en la base a travez del parametro ID.

localhost:8080/api/alumnos/1
*/
app.delete('/api/alumnos/:id', (req, res) =>{
    let result = alumnoController.quitarAlumno(req.params.id)
    res.json(result)
})


