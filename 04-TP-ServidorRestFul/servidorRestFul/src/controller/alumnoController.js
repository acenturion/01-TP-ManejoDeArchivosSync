const fs = require('fs');
const alumnosDBPath = './data/alumnos.json'

/* Funcion para obtener todos los alumnos del archivo*/
function getAlumnos(){
    return getAlumnosFromFile();
}

/* obtengo el alumno por dni*/
function getAlumno(dni){
    let result = null
    
    result = searchAlumno('dni',dni);

    return result;
}

/* Agrego un nuevo alumno al archivo
newAlumno: el objeto con el nuevo alumno ingresado
*/
function setAlumno(newAlumno){
    
    let result = false;

    if(!existAlumno(newAlumno.dni)){
        let alumnos = getAlumnosFromFile();
        newAlumno["id"] = alumnos.length+1;
        alumnos.push(newAlumno);
        fs.writeFileSync(alumnosDBPath, JSON.stringify(alumnos, null, 1), 'utf-8');
        result = true;
    }
    return result;
}

/* Obtengo todos los alumnos que esten en un rago de edad
min = edad minima
max edad maxima
*/
function getAlumnosByEdad(min, max){
    let alumnos = getAlumnosFromFile();
    let i = 0;
    let result = [];
    while(i < alumnos.length){
        let alumno = alumnos[i];
        if(alumno.edad >= parseInt(min) && alumno.edad <= parseInt(max)){
            result.push(alumno);
        }
        i++
    }

    return result;

}

/* Modifico un alumno existente en la base, la busqueda es Id del alumnno
  updateAlumno = objeto con los nuevos valor a modificar
*/
function modificarAlumno(id,updateAlumno){   
    let alumnos = getAlumnosFromFile();
    let result = false;
    let i = 0;

    while(i < alumnos.length && !result){
        let alumno = alumnos[i];
        if(alumno.id == id){
            alumno.dni = updateAlumno.dni
            alumno.nombre = updateAlumno.nombre
            alumno.apellido = updateAlumno.apellido
            alumno.edad = updateAlumno.edad

            fs.writeFileSync(alumnosDBPath, JSON.stringify(alumnos, null, 1), 'utf-8');
            
            result = true;
        }
        i++
    }

    return result
}

/*Elimino un alumno existente del archivo por el parametro ID*/
function quitarAlumno(id){
    let alumnos = getAlumnosFromFile();
    let result = false;
    let i = 0;

    while(i < alumnos.length && !result){
        let alumno = alumnos[i];
        if(alumno.id == parseInt(id)){
            alumnos.splice(i,1);
            fs.writeFileSync(alumnosDBPath, JSON.stringify(alumnos, null, 1), 'utf-8');
            result = true;
        }
        i++
    }

    return result
}


/***** Metodos privados  *****/


/*Metodo para buscar un alumno, por cualquier key y value ingresada
ejemplo: searchAlumno("dni", 11222333);
*/
function searchAlumno(key, value){
    let alumnos = getAlumnosFromFile();
    let i = 0;
    let result = null;

    while(i < alumnos.length && !result){
        let al = alumnos[i]
        if(al[key] == value){
            result = al;
        }
        i++;
    }

    return result;
}

/*Retorna un booleano verificando la existencia del alumno*/
function existAlumno(dni){
    let alumnos = getAlumnosFromFile();
    let i = 0;
    let result = false;

    while(i < alumnos.length && !result){
        let al = alumnos[i]
        if(al.dni == dni){
            result = true;
        }
        i++;
    }
    return result;
}

/*Obtengo todos los alumnos del archivo local, como si fuera una DB*/
function getAlumnosFromFile(){
    let alumnos = fs.readFileSync(alumnosDBPath, 'utf-8');
    let alumnosJson = JSON.parse(alumnos);

    return alumnosJson;
}



module.exports = {
    setAlumno,
    getAlumnos,
    getAlumno,
    getAlumnosByEdad,
    modificarAlumno,
    quitarAlumno
}