const fs = require('fs');
const {separaArquivo} = require('./functions');
const iconv = require("iconv-lite");

const QTD_ARQUIVOS = 8;
const TAM_LINHA    = 300;

let fdCepDat = null;

/* Limpa todos os arquivos do diretório */

let arquivos = fs.readdirSync(process.cwd() + '/src/extMergeSort/data');

arquivos.forEach((v) => {
    fs.unlinkSync(process.cwd() + `/src/extMergeSort/data/${v}`);
});

/* Fim da limpeza de arquivos */

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

    while(fim <= 14){

        // Abre dois arquivos sequenciais + um arquivo para saída
        let arquivoa = fs.openSync(process.cwd() + `/src/extMergeSort/data/cep_${inicio}.dat`, 'r');
        let arquivob = fs.openSync(process.cwd() + `/src/extMergeSort/data/cep_${inicio + 1}.dat`, 'r');
        let arquivoSaida = fs.openSync(process.cwd() + `/src/extMergeSort/data/cep_${fim}.dat`, 'w');

        let buffera = new Buffer.alloc(TAM_LINHA);
        let bufferb = new Buffer.alloc(TAM_LINHA);

        fs.readSync(arquivoa, buffera , 0, TAM_LINHA, 0);
        fs.readSync(arquivob, bufferb , 0, TAM_LINHA, 0);

        var cepa    = parseInt(iconv.encode(buffera.toString('latin1'), 'iso-8859-1').toString().substr(290, 10));
        var cepb    = parseInt(iconv.encode(bufferb.toString('latin1'), 'iso-8859-1').toString().substr(290, 10));

        let ca = 0;
        let cb = 0;

        while(cepa && cepb){

            if(cepa < cepb){
                ca++;

                fs.appendFileSync(process.cwd() + `/src/extMergeSort/data/cep_${fim}.dat`, iconv.encode(buffera.toString('latin1'), 'iso-8859-1'));
                buffera = new Buffer.alloc(TAM_LINHA);
                fs.readSync(arquivoa, buffera, 0, TAM_LINHA, TAM_LINHA * ca);

                cepa = parseInt(iconv.encode(buffera.toString('latin1'), 'iso-8859-1').toString().substr(290, 10));

            }else if(cepb < cepa){
                cb++;

                fs.appendFileSync(process.cwd() + `/src/extMergeSort/data/cep_${fim}.dat`, iconv.encode(bufferb.toString('latin1'), 'iso-8859-1'));
                bufferb = new Buffer.alloc(TAM_LINHA);
                fs.readSync(arquivob, bufferb, 0, TAM_LINHA, TAM_LINHA * cb);


                cepb = parseInt(iconv.encode(bufferb.toString('latin1'), 'iso-8859-1').toString().substr(290, 10));


            }

        }

        while(cepa){
            ca++;
            fs.appendFileSync(process.cwd() + `/src/extMergeSort/data/cep_${fim}.dat`, iconv.encode(buffera.toString('latin1'), 'iso-8859-1'));

            buffera = new Buffer.alloc(TAM_LINHA);
            fs.readSync(arquivoa, buffera, 0, TAM_LINHA, TAM_LINHA * ca);
            cepa = parseInt(iconv.encode(buffera.toString('latin1'), 'iso-8859-1').toString().substr(290, 8));
        }

        while(cepb){

            cb++;
            fs.appendFileSync(process.cwd() + `/src/extMergeSort/data/cep_${fim}.dat`, iconv.encode(bufferb.toString('latin1'), 'iso-8859-1'));

            bufferb = new Buffer.alloc(TAM_LINHA);
            fs.readSync(arquivob, bufferb, 0, TAM_LINHA, TAM_LINHA * cb);
            cepb    = parseInt(iconv.encode(bufferb.toString('latin1'), 'iso-8859-1').toString().substr(290, 8));

        }

        fs.closeSync(arquivoSaida);
        fs.closeSync(arquivoa);
        fs.closeSync(arquivob);


        fs.unlinkSync(process.cwd() + `/src/extMergeSort/data/cep_${inicio}.dat`);
        fs.unlinkSync(process.cwd() + `/src/extMergeSort/data/cep_${inicio + 1}.dat`);

        inicio += 2;
        fim++;
    }

    process.exit(1);
}
