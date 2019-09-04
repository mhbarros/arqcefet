const fs = require('fs');

const TAMANHO_REGISTRO = 300;

var TAM_LINHA = 300;

let file = fs.open(process.cwd() + '/cep_ordenado.dat', 'r', (err, fd) => {

    if (err) {
        console.log(err);
        console.log('Erro. Não foi possível abrir o arquivo.');
        return;
    }

    let buffer = Buffer.alloc(TAMANHO_REGISTRO);

    fs.fstat(fd, (_, a) => {
        let inicio = 0;
        var meio   = 0;
        let fim    = 0;

        fim = a.size / 300 - 1;
        let i = 1;
        this.exit = false;
        while (i < fim && this.exit === false) {
            i++;

            fs.readSync(fd, buffer, 0, 300, 300 * meio);

            let endereco = buffer.toString('latin1');
            let cep = endereco.substr(290, 8);

            if (cep == '22220001') {
                console.log('achei');
                break;

            } else if (cep <= '22220001') {
                inicio = meio + 1;

            } else {
                fim = meio - 1;
            }

            meio = Math.floor((inicio + fim) / 2);

            console.log(meio);

        }
    });


    /*fs.fstat(fd, (_, a) => {
        let inicio = 0;
        let fim = (a.size / TAM_LINHA) - 1;
        let i = 0;

        let buffer = new Buffer(TAM_LINHA);
        let c = 0;

        while( inicio <= fim){
            let meio = (inicio + fim) / 2;
            var r = fs.readSync(fd, buffer, i, 72, i);
            console.log(buffer.toString('latin1'));
            i += r;
            c++;
            if(c == 2)
                break;

        }

        return;
    });*/
});
