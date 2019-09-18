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

// Separando o arquivo em arquivos menores
if(separaArquivo(fdCepDat, QTD_ARQUIVOS)){
     for(let i = 0; i < QTD_ARQUIVOS ; i++){
        let fdArquivoCep = fs.openSync(process.cwd() + `/src/extMergeSort/data/cep_${i}.dat`, 'r');
        quickSort(fdArquivoCep, i);
     }

    // Terminou a ordenação de todos os arquivos ( São feitas operações síncronas )

    // Intercalar os arquivos



}
