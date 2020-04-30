//Este test realiza el backup de los archivos

const bk = require("../src/backUpFiles.js");


const rutaOriginal = "./files/original/";
const rutaBkpSync = "./files/orginalSync-bkp/";
const rutaBkpAsync = "./files/orginalAync-bkp/";
const rutaBkpNewAsync = "./files/orginalNewAync-bkp/";
const filters = [".",".documento"];

//bk.realizarBackUpFolderSync(rutaOriginal, rutaBkpSync, filters);

// bk.realizarBackUpFolderAsync(rutaOriginal, rutaBkpAsync, filters);

bk.realizarBackUpFolderNewAsync(rutaOriginal, rutaBkpNewAsync, filters);