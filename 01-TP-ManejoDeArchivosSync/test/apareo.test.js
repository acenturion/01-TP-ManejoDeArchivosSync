import {escribirTextoEnArchivo, leerArchivoComoString} from "../src/utils/fileUtils.js"
import {transformarArrayDeNumerosAUnSoloString , transformarStringEnArrayDeNumeros} from "../src/utils/transformUtils.js"
import {combinarDosArrays, combinarNArrays} from "../src/apareo.js"


// leo los 4 archivos a memoria

let a = leerArchivoComoString("./in/10NumerosOrdenadosEntre1y50(setA).in");
let b = leerArchivoComoString("./in/10NumerosOrdenadosEntre1y50(setB).in");
let c = leerArchivoComoString("./in/imparesOrdenadosEntre1y999.in");
let d = leerArchivoComoString("./in/paresOrdenadosEntre2y1000.in");

// preparo los 4 arrays a partir de los archivo leidos
let arrayA = transformarStringEnArrayDeNumeros(a, ",")
let arrayB = transformarStringEnArrayDeNumeros(b, ",")
let arrayC = transformarStringEnArrayDeNumeros(c, ",")
let arrayD = transformarStringEnArrayDeNumeros(d, ",")

// combino los primeros dos arrays
let resArrayAYArrayB = combinarDosArrays(arrayA,arrayB);

// combino los cuatro arrays

let arrays = [arrayA,arrayB,arrayC,arrayD]
let megaArray = combinarNArrays(arrays);

// guardo los resultados en 2 archivos
let test1 = transformarArrayDeNumerosAUnSoloString(resArrayAYArrayB);
let test2 = transformarArrayDeNumerosAUnSoloString(megaArray);

escribirTextoEnArchivo("./out/test1",test1,true);
escribirTextoEnArchivo("./out/test2",test2,true);