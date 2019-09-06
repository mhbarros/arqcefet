const fs   = require('fs');
const http = require('https');
const rl   = require('readline');

const buscaCep = (fd, CEP) => {
    const TAM_LINHA = 300;

    let buffer = Buffer.alloc(TAM_LINHA);

    fs.fstat(fd, (_, a) => {
        let inicio = 0;
        var meio   = 0;
        let fim    = a.size / TAM_LINHA - 1;

        let numIteracoes = 0;

        let endereco = '';
        let rua      = '';
        let bairro   = '';
        let cidade   = '';
        let estado   = '';
        let sigla    = '';

        while (inicio <= fim) {
            numIteracoes++;

            meio = Math.floor((inicio + fim) / 2);

            fs.readSync(fd, buffer, 0, TAM_LINHA, TAM_LINHA * meio); // Lendo uma linha e jogando no buffer

            let enderecoTemp    = buffer.toString('latin1');
            let cepEndereco = enderecoTemp.substr(290, 8);

            // Caso o cep da iteração seja igual ao cep entrado pelo usuário
            if (cepEndereco === CEP) {
                endereco = enderecoTemp;

                rua      = endereco.substr(0, 72);
                bairro   = endereco.substr(72, 72);
                cidade   = endereco.substr(144, 72);
                estado   = endereco.substr(216, 72);
                sigla    = endereco.substr(288, 2);

                console.log(`\nConsegui encontrar o cep após ${numIteracoes} iterações.`);
                break;

            } else if (cepEndereco < CEP) { // Caso o cep da iteração seja menor do que o cep entrado pelo usuário
                inicio = meio + 1;

            } else { // Caso o cep da iteração seja maior do que o cep entrado pelo usuário
                fim = meio - 1;
            }
        }
        if(endereco === ''){
            console.log("Não encontrei nenhum endereço com esse cep... Você digitou corretamente?")
            return;
        }

        console.log(`\nRua: ${rua}\nBairro: ${bairro}\nCidade: ${cidade}\nEstado: ${estado}\nSigla: ${sigla}`);
    });
};

const downloadArquivo = (CEP) => {
    let tamanhoArquivo = 0;

    /* Realizando o download do arquivo */
    const file = fs.createWriteStream(process.cwd() + '/src/buscacep/cep_ordenado.dat');
    const request = http.get('https://dl.dropboxusercontent.com/cd/0/get/AoCPvGZDYX3zFnKGAxMev3urQzuMXwJtWgltqvURuHw92YMW6RFK4tgBdb2Z-3_BeJt0aDhVSBjlRBqDDOScp4P1WZF07WXFnIXO5K7JkBYxFB1-l6wpitqwWYMs9BTo2vU/file?dl=1#', (response) => {

        response.pipe(file);

    });

    request.on('response', (data) => {
        tamanhoArquivo = data.headers["content-length"];

    });

    let interval = setInterval(() => {

        let p = Math.round(request.connection.bytesRead / tamanhoArquivo * 100);

        if(isNaN(p)){
            clearInterval(interval);
            process.stdout.write("O link para download está quebrado =( \n Por favor, coloque o arquivo cep_ordenado.dat em src/buscacep .");
            return;
        }

        rl.cursorTo(process.stdout, 0);
        process.stdout.write(`Baixando o arquivo cep_ordenado.dat... ${p}%`);

        if(p == 100){

            fs.open(process.cwd() + '/src/buscacep/cep_ordenado.dat', 'r', (err, fd) => {

                buscaCep(fd, CEP);
            });

            clearInterval(interval);
        }

    }, 2000);
};

module.exports = {
  buscaCep, downloadArquivo
};
