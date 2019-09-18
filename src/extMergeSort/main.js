const fs = require('fs');
const {separaArquivo, quickSort, merge} = require('./functions');

const QTD_ARQUIVOS = 8;

let fdCepDat = null;

try {
    fdCepDat = fs.openSync(process.cwd() + '/src/data/cep.dat', 'r');
} catch (e) {
    console.log("Não consegui ler o arquivo cep.dat ... Ele está na pasta /src/data ?");
    return;
}

// Separando o arquivo em arquivos menores já ordenados
if(separaArquivo(fdCepDat, QTD_ARQUIVOS)){

    // fdCepDat = fs.openSync(process.cwd() + '/src/data/cep.dat', 'r');

    let inicio = 0;
    let fim = QTD_ARQUIVOS;

    /*while(!(inicio + 1 == fim)){

    }*/




}
