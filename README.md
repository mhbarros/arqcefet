## Organização de estruturas de arquivos
Trabalhos referentes ao curso de Organização de estruturas de arquivos.<br><br>
<strong>Professor</strong>: Renato Mauro<br>
<strong>Responsável</strong>: Marcelo Henrique de Barros (<i> 1816071BCC, mhbarros99@gmail.com </i>)<br>
<strong>Linguagem utilizada</strong>: JavaScript<br><br>

## Instalação do Ambiente
Antes de tudo, é necessário ter o NodeJS instalado na sua máquina. Para isso, <a href="https://nodejs.org/en/download/">Clique aqui</a> e siga o passo a passo de como instalar em seu sistema operacional.<br>
O NodeJS acompanha um gerênciador de dependências chamado <strong>NPM</strong>. Nós iremos utiliza-lo para rodar os projetos.
## Executando os trabalhos
Com o NodeJS e o NPM instalados, agora é preciso entender a estrutura de pastas do repositório:<br>
<li>src</li>
<ul>data ( Pasta de arquivos estáticos, independentes de projetos )</ul>
<ul>
nome_do_projeto ( pasta do trabalho )
<ul>main.js ( arquivo de entrada )</ul>
</ul>
Todos os arquivos referentes ao trabalho ficam situados na pasta <strong>src</strong> e cada projeto sua pasta.<br><br>
Para executar algum trabalho, basta abrir o CMD do Windows / terminal do linux na <strong>raiz do projeto</strong> ( um nível antes da pasta src )e digitar um dos seguintes comandos:<br><br>
<li>npm run-script buscacep [seu cep]</li><br>
<li>npm install && npm run-script extmergesort</li><br>
<i>Mais em breve...</i><br>

### BuscaCep
Programa utilizando o algoritmo de busca binária para encontrar um endereço pelo cep dentro de um arquivo de 200MB.<br><br>
<b>Observação</b>: É necessário ter o arquivo cep_ordenado.dat dentro da pasta <strong>/src/data</strong>. Caso não possua, o programa irá realizar o download automaticamente =), então basta rodar <strong>npm run-script buscacep 22220001</strong> 

### External Merge Sort
Programa que realiza um External Merge Sort. Divide um arquivo grande ( cep.dat ) em 8 arquivos menores ordenados e intercala todos, formando um arquivo final ordenado com o mesmo tamanho do original.<br>
<b>Observação</b>: É necessário ter o arquivo cep.dat dentro da pasta <strong>/src/data</strong>.<br><br>
<b>Observação2</b>: Foi necessário utilizar a biblioteca [iconv-lite](https://www.npmjs.com/package/iconv-lite)  para realizar a codificação para latin1. Ao utilizar o método <strong>toString()</strong> no NodeJS, ele converte tudo para UTF-8. Como não há meios nativos de realizar a conversão de volta, foi preciso utilizar a bilblioteca.

