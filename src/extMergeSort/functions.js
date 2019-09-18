const fs = require('fs');
const TAM_LINHA = 300;

const separaArquivo = (fd, qtdArquivos) => {
    let statsCepDat = null;

    try {
        statsCepDat = fs.fstatSync(fd);
    } catch (e) {
        console.log("Não consegui ler o arquivo cep.dat ... Ele está na pasta /src/data ?");
        return false;
    }

    // Definindo variáveis para início da leitura

    let qtdRegistros = statsCepDat.size / TAM_LINHA;
    let qtdPorArquivo = Math.floor(qtdRegistros / qtdArquivos);
    let quebrado = qtdRegistros % qtdArquivos;
    let tamanhoBuffer = TAM_LINHA * qtdPorArquivo - 2;
    let buffer = Buffer.alloc(tamanhoBuffer); // Aloca espaço em memória para o arquivo

    // Processo de separação dos arquivos
    for (let i = 0; i < qtdArquivos; i++) {
        let nomeArquivo = process.cwd() + `/src/extMergeSort/data/cep_${i}.dat`;
        if (i !== qtdArquivos - 1) {
            fs.readSync(fd, buffer, 0, tamanhoBuffer, qtdPorArquivo * TAM_LINHA * i);
            fs.writeFileSync(nomeArquivo, buffer.toString('latin1'));

        } else {
            tamanhoBuffer = TAM_LINHA * qtdPorArquivo - 2 + (quebrado * TAM_LINHA);
            buffer = Buffer.alloc(tamanhoBuffer);

            fs.readSync(fd, buffer, 0, TAM_LINHA * qtdPorArquivo - 2 + (quebrado * TAM_LINHA), qtdPorArquivo * TAM_LINHA * i);
            fs.writeFileSync(nomeArquivo, buffer.toString('latin1'));
        }
    }
    return true;
};

const quickSort = (fd) => {

};

module.exports = {separaArquivo, quickSort};
