const fileUtils = require("../src/utils/fileUtils");
const transformUtils = require("../src/utils/transformUtils");
const apareo = require("../src/apareo");


// leo los 4 archivos a memoria

let a = fileUtils.leerArchivoComoString("C:/Users/Minimal/Documents/ort/01-TP-ManejoDeArchivosSync/in/10NumerosOrdenadosEntre1y50(setA).in");
let b = fileUtils.leerArchivoComoString("C:/Users/Minimal/Documents/ort/01-TP-ManejoDeArchivosSync/in/10NumerosOrdenadosEntre1y50(setB).in");
let c = fileUtils.leerArchivoComoString("C:/Users/Minimal/Documents/ort/01-TP-ManejoDeArchivosSync/in/imparesOrdenadosEntre1y999.in");
let d = fileUtils.leerArchivoComoString("C:/Users/Minimal/Documents/ort/01-TP-ManejoDeArchivosSync/in/paresOrdenadosEntre2y1000.in");

// preparo los 4 arrays a partir de los archivo leidos
let arrayA = transformUtils.transformarStringEnArrayDeNumeros(a, ",")
let arrayB = transformUtils.transformarStringEnArrayDeNumeros(b, ",")
let arrayC = transformUtils.transformarStringEnArrayDeNumeros(c, ",")
let arrayD = transformUtils.transformarStringEnArrayDeNumeros(d, ",")

// combino los primeros dos arrays
let resArrayAYArrayB = apareo.combinarDosArrays(arrayA,arrayB);

// combino los cuatro arrays

let arrays = [arrayA,arrayB,arrayC,arrayD]
let megaArray = apareo.combinarNArrays(arrays);

// guardo los resultados en 2 archivos
let test1 = transformUtils.transformarArrayDeNumerosAUnSoloString(resArrayAYArrayB);
let test2 = transformUtils.transformarArrayDeNumerosAUnSoloString(megaArray);

fileUtils.escribirTextoEnArchivo("C:/Users/Minimal/Documents/ort/01-TP-ManejoDeArchivosSync/out/test1",test1,true);
fileUtils.escribirTextoEnArchivo("C:/Users/Minimal/Documents/ort/01-TP-ManejoDeArchivosSync/out/test2",test2,true);