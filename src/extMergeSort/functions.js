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

            // Os endereços estão no buffer. Ordena-los
            let enderecos = quickSort(buffer.toString('latin1'), qtdPorArquivo);
            let final = '';
            let c = 0;
            enderecos.forEach((v) => {
                let rua    = v.substr(0, 72);
                let bairro = v.substr(72, 72);
                let cidade = v.substr(144, 72);
                let estado = v.substr(216, 72);
                let sigla  = v.substr(288, 2);
                let cep    = v.substr(290, 10);

                final += rua + bairro + cidade + estado + sigla + cep;

                c++;

            });
            fs.appendFileSync(nomeArquivo, iconv.encode(final, 'iso-8859-1'));


        } else {

            tamanhoBuffer = TAM_LINHA * qtdPorArquivo + (quebrado * TAM_LINHA);
            buffer = Buffer.alloc(tamanhoBuffer);

            fs.readSync(fd, buffer, 0, TAM_LINHA * qtdPorArquivo + (quebrado * TAM_LINHA), qtdPorArquivo * TAM_LINHA * i);

            let enderecos = quickSort(buffer.toString('latin1'));
            let final = '';
            enderecos.forEach((v) => {
                let rua    = v.substr(0, 72);
                let bairro = v.substr(72, 72);
                let cidade = v.substr(144, 72);
                let estado = v.substr(216, 72);
                let sigla  = v.substr(288, 2);
                let cep    = v.substr(290, 10);
                final += rua + bairro + cidade + estado + sigla + cep;

            });

            fs.appendFileSync(nomeArquivo, iconv.encode(final, 'iso-8859-1'));
        }
    }

    return true;
};

const quickSort = (registros) => {

    if(typeof registros !== 'undefined'){
        let enderecos = registros.split('\n');
        enderecos.length--; // Remove o ultimo elemento, que seria um espaço em branco.

        enderecos.sort((a,b) => {

            let cepa    = a.substr(290, 9);
            let cepb    = b.substr(290, 9);

            if(parseInt(cepa) < parseInt(cepb)){
                return -1;
            }else if(parseInt(cepa) > parseInt(cepb)){
                return 1;
            }
            return 0;
        });

        enderecos = enderecos.map(i => i + '\n');

        return enderecos;
    }

    return null;
};

module.exports = {separaArquivo, quickSort};
