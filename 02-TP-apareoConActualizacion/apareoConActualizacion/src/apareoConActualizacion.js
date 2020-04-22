// importar lo que sea necesario
const fs = require('fs');
const util = require('util');

/**
 * ordena (in place) una coleccion de datos segun las claves provistas.
 * @param {Object[]} coleccion el array que quiero ordenar
 * @param {string[]} claves las claves por las que quiero ordenar, por orden de importancia
 */
function ordenar(coleccion, claves) {
    return coleccion.sort((a, b) => (a[claves] > b[claves]) ? 1 : -1);
}

/**
 * recibe las rutas del archivo de deudas original, archivo de pagos, archivo de deudas con las actualizaciones, y archivo de log para registrar errores o advertencias.
 * @param {string} rutaDeudasOld
 * @param {string} rutaPagos
 * @param {string} rutaDeudasNew
 * @param {string} rutaLog
 */
function actualizarArchivosDeudas(rutaDeudasOld, rutaPagos, rutaDeudasNew, rutaLog) {
    let deudas = fs.readFileSync(rutaDeudasOld, 'utf-8');
    let pagos = fs.readFileSync(rutaPagos, 'utf-8');
    let deudasJson = JSON.parse(deudas);
    let pagosJson = JSON.parse(pagos);

    let newDeudas = actualizarDeudas(deudasJson, pagosJson, function (logT) {
        fs.appendFileSync(rutaLog, logT, 'utf-8')
    });

    fs.appendFileSync(rutaDeudasNew, JSON.stringify(newDeudas, null, 1), 'utf-8');

}

/**
 * @callback loggerCallback
 * @param {string} error error message to display
 */

/**
 * realiza el apareo con actualizacion entre deudas y pagos, y loguea algunos eventos relevantes.
 * @param {Object[]} deudas las deudas originales
 * @param {Object[]} pagos los pagos a aplicar
 * @param {loggerCallback} logger funcion a la cual llamar en caso de necesitar loguear un evento
 * @returns {Object[]} las deudas actualizadas
 */
function actualizarDeudas(deudas, pagos, logger) {

    /*Verifico los pagos */
    pagos.forEach(pago => {
        let deudor = deudas.filter(deuda => pago.dni == deuda.dni);
        deudor = deudor[0];
        if (!deudor) {
            logger(armarMsgPagoSinDeudaAsociada(pago));
        } else if (deudor.apellido != pago.apellido) {
            logger(armarMsgPagoConDatosErroneos(deudor, pago));
        } else {
            deudor.debe -= pago.pago;

            if (deudor.debe < 0) {
                logger(armarMsgPagoDeMas(deudor));
            }
        }

    })

    /*Creo el nuevo array con los deudores */
    let newDeudor = []
    deudas.forEach(deudor => {
        if (deudor.debe > 0) {
            newDeudor.push(deudor);
        }
    })

    return newDeudor;
}

/**
 * arma un mensaje informando los detalles de un pago que no corresponde a ninguna deuda
 * @param {Object} pago el pago sin deuda correspondiente
 * @returns {string} el mensaje a logguear
 */
function armarMsgPagoSinDeudaAsociada(pago) {
    const logMsg = `
el siguiente pago no corresponde a ninguna deuda:
${util.inspect(pago)}

=================================
`
    return logMsg
}

/**
 * arma un mensaje indicando el dni del sujeto que pagó de más, y cuanto dinero quedó a su favor
 * @param {Object} deuda la deuda con excedente de pago
 * @returns {string} el mensaje a logguear
 */
function armarMsgPagoDeMas(deuda) {
    const logMsg = `
dni: ${deuda.dni} posee $${Math.abs(deuda.debe)} a su favor

=================================
`
    return logMsg
}

/**
 * arma un mensaje mostrando la deuda, y el pago que no se pudo concretar, y notifica que el registro permanece sin cambios.
 * @param {Object} deuda
 * @param {Object} pago
 * @returns {string} el mensaje a logguear
 */
function armarMsgPagoConDatosErroneos(deuda, pago) {
    const logMsg = `
error al querer actualizar esta deuda:
${util.inspect(deuda)}
con este pago:
${util.inspect(pago)}

se mantiene el registro original sin cambios

=================================
`
    return logMsg
}

// no modificar la interfaz pública!
module.exports = {
    actualizarArchivosDeudas
}
