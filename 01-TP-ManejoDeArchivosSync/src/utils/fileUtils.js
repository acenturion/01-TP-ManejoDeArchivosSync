const fs = require("fs");
const ENCODE = 'utf-8'
/**
 * lee y devuelve el contenido de un archivo como texto en 'utf-8'
 * @param {string} ruta relativa al directorio del proyecto
 * @return {string} el texto leído
 */
function leerArchivoComoString(ruta) {
    let data = null;
    try {
        data = fs.readFileSync(ruta, ENCODE)
    } catch (error) {
        console.log(error);
    }
    return data;
}

/**
 * escribe el texto en el archivo de la ruta, sólo si tal archivo existe. sino, lanza error.
 * @param {string} ruta relativa al directorio del proyecto
 * @param {string} texto 
 */
function escribirTextoEnArchivo(ruta, texto, shouldCreateIfNotExists) {
    try {
        let exist = fs.existsSync(ruta);
        if(exist){
            fs.appendFileSync(ruta, texto)
        }else{
            if(shouldCreateIfNotExists){
                fs.writeFileSync(ruta, texto)
             }else{
                 console.log('Archivo no existe')
             }
        }
    } catch (error) {
        console.log(error)
    }
}

// exportar ambas funciones
module.exports = {
    leerArchivoComoString,
    escribirTextoEnArchivo
}