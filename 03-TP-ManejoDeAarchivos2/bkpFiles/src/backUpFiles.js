const fs = require('fs');
const path = require('path');

function realizarBackUpFolderSync(rutaOriginal, rutaBkp, filters) {
    if (!fs.existsSync(rutaBkp)) {
        fs.mkdirSync(rutaBkp);
    }

    let nameFiles = fs.readdirSync(rutaOriginal);

    for (let i = 0; i < nameFiles.length; i++) {
        let name = nameFiles[i];
        if (filterFiles(name, filters)) {
            let pathfile = rutaOriginal + nameFiles[i];
            let toPathfile = rutaBkp + nameFiles[i];
            try {
                fs.copyFileSync(pathfile, toPathfile)
            } catch (error) {
                console.log(error);
            }

        }
    }
};
function realizarBackUpFolderAsync(rutaOriginal, rutaBkp, filters) {
    fs.access(rutaBkp, function (err) {
        if (err) {
            fs.mkdir(rutaBkp, () => { })
        }
    });

    fs.readdir(rutaOriginal, (err, files) => {
        files.forEach(name => {
            if (filterFiles(name, filters)) {
                fs.copyFile(rutaOriginal + name, rutaBkp + name, () => { });
            }
        })

    })

};

async function realizarBackUpFolderNewAsync(rutaOriginal, rutaBkp, filters) {
    try {
        let exists = await fs.access(rutaBkp);
        console.log(exists);
        
        if (exists) {
            //fs.mkdir(rutaBkp, () => { })
        }
    } catch (error) {
        console.log(error);

    }
};


function filterFiles(string, suffixes) {
    for (let suffix of suffixes) {
        if (string.endsWith(suffix) || string.startsWith(suffix))
            return true;
    }
    return false;
}

module.exports = {
    realizarBackUpFolderSync,
    realizarBackUpFolderAsync,
    realizarBackUpFolderNewAsync
}