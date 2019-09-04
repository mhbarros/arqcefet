const fs = require('fs');

const {buscaCep, downloadArquivo} = require('./functions');

if (!process.argv[2]) {
    console.log("\nPor favor, digite um CEP como argumento.");
    return;
}

const CEP = process.argv[2].replace("-", "");

if (CEP.length > 8 || CEP.length < 8) {
    console.log("\nCep inválido.");
}

fs.open(process.cwd() + '/src/buscacep/cep_ordenado.dat', 'r', (err, fd) => {

    if (err) {
        console.log('Poxa, não encontrei o arquivo de cep =(. Vou fazer o download para você, aguarde um pouco..\n Caso não queira aguardar o download, apenas jogue o arquivo cep_ordenado.dat dentro da pasta /src/buscacep e reinicie o programa.');
        downloadArquivo(CEP);

    } else {
        /* Lógica de busca binária no arquivo functions.js */
        buscaCep(fd, CEP);

    }
});
