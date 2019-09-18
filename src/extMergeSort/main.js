const fs = require('fs');
const {separaArquivo, quickSort} = require('./functions');

const QTD_ARQUIVOS = 10;

let fdCepDat = null;

try {
    fdCepDat = fs.openSync(process.cwd() + '/src/data/cep.dat', 'r');
} catch (e) {
    console.log("Não consegui ler o arquivo cep.dat ... Ele está na pasta /src/data ?");
    return;
}

// Separando o arquivo em arquivos menores
if(separaArquivo(fdCepDat, QTD_ARQUIVOS)){
    // let fdArquivoCep = fs.openSync(process.cwd() + '/src/extMergeSort/arquivos_separados/cep_0.dat', 'w');
    // quickSort(fdArquivoCep);
}
