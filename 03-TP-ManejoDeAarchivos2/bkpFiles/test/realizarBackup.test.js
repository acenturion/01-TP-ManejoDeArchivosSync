//Este test realiza el backup de los archivos

const bk = require("../src/backUpFiles.js");


const rutaOriginal = "./files/original/";
const rutaBkpSync = "./files/orginalSync-bkp/";
const rutaBkpAsync = "./files/orginalAsync-bkp/";
const rutaBkpNewAsync = "./files/orginalNewAsync-bkp/";
const filters = [".",".documento"];

bk.realizarBackUpFolderSync(rutaOriginal, rutaBkpSync, filters);

bk.realizarBackUpFolderAsync(rutaOriginal, rutaBkpAsync, filters);

//bk.realizarBackUpFolderNewAsync(rutaOriginal, rutaBkpNewAsync, filters);