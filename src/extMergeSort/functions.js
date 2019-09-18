const fs = require('fs');
const iconv = require('iconv-lite');

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
    let tamanhoBuffer = TAM_LINHA * qtdPorArquivo;
    let buffer = Buffer.alloc(tamanhoBuffer); // Aloca espaço em memória para o arquivo

    // Processo de separação dos arquivos
    for (let i = 0; i < qtdArquivos; i++) {
        let nomeArquivo = process.cwd() + `/src/extMergeSort/data/cep_${i}.dat`;

        if (i !== qtdArquivos - 1) {

            fs.readSync(fd, buffer, 0, tamanhoBuffer, qtdPorArquivo * TAM_LINHA * i);

            fs.writeFileSync(nomeArquivo, iconv.encode(buffer.toString('latin1'), 'iso-8859-1'));

        } else {

            tamanhoBuffer = TAM_LINHA * qtdPorArquivo + (quebrado * TAM_LINHA);
            buffer = Buffer.alloc(tamanhoBuffer);

            fs.readSync(fd, buffer, 0, TAM_LINHA * qtdPorArquivo + (quebrado * TAM_LINHA), qtdPorArquivo * TAM_LINHA * i);
            fs.writeFileSync(nomeArquivo, iconv.encode(buffer.toString('latin1'), 'iso-8859-1'));
        }
    }
    return true;
};

const quickSort = (fd, numArquivo) => {
     let buffer = Buffer.alloc(TAM_LINHA);

    let statsCep = null;

    try {
        statsCep = fs.fstatSync(fd);
    } catch (e) {
        console.log("Não consegui ler o arquivo cep.dat ... Ele está na pasta /src/data ?");
        return false;
    }

    let qtdRegistros = statsCep.size / TAM_LINHA;

    let enderecos = [];
    for(let i = 0 ; i < qtdRegistros ; i++){
        fs.readSync(fd, buffer, 0, TAM_LINHA, i * TAM_LINHA);

        let end = buffer.toString('latin1');

        // Jogando para estrutura
        let rua      = end.substr(0, 72);
        let bairro   = end.substr(72, 72);
        let cidade   = end.substr(144, 72);
        let estado   = end.substr(216, 72);
        let sigla    = end.substr(288, 2);
        let cep      = end.substr(290, 8);

        enderecos.push({rua, bairro, cidade, estado, sigla, cep});
    }

    enderecos.sort((a,b) => {
        if(a.cep < b.cep){
            return -1;
        }else if(b.cep < a.cep){
            return 1;
        }
        return 0;
    });

    // Removendo o arquivo anterior para substituir pelo novo
    fs.unlinkSync(`./src/extMergeSort/data/cep_${numArquivo}.dat`);
    fs.closeSync(fd);

    enderecos.forEach((v) => {
        let novoEndereco = v.rua + v.bairro + v.cidade + v.estado + v.sigla + v.cep + "\n";
        fs.appendFileSync(`./src/extMergeSort/data/cep_${numArquivo}.dat`, novoEndereco);
    });
};

const merge = (fd) => {

};

module.exports = {separaArquivo, quickSort, merge};
