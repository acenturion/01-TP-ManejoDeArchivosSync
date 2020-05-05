//NO MODIFICAR EL TEST!
//const ap = require('../src/apareoConActualizacion.js');
import actualizarArchivosDeudas  from '../src/apareoConActualizacion.js'


const rutaDeudasOld = './in/deudasOLD.json'
const rutaPagos = './in/pagos.json'
const rutaDeudasNew = './out/deudasNEW.json'
const rutaLog = './out/notificaciones.log'

actualizarArchivosDeudas(rutaDeudasOld, rutaPagos, rutaDeudasNew, rutaLog)
