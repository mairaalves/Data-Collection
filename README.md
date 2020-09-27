# DC-PLATFORM_CHALLENGE

Este é o desafio do time DC-Platform da Linx

## Part-1

### Problema:
A primeira parte consiste em um problema de rate limit para uma api que recebe produtos a serem salvos em um banco.

### Solução

Construída em NodeJs + Express + MongoDb

Foi criada uma api que bloqueia requisições com o mesmo payload caso estas tenham sido feitas em um intervalo menor do que 10 minutos. Para isso, o banco de dados MongoDb foi utilizado para cachear o valor da última requisição feita, utilizando o subindex expiresAfterSeconds para expirar o dado salvo após o tempo determinado.

### Desenvolvimento


Para rodar o projeto é necessário ter o docker instalado e instalar as dependências continas no package.json, para isto basta executar o seguinte  na pasta raíz da parte 1.

>npm install 


### Docker
Para rodar o projeto e caso esteja familiarizado com o Docker execute o comando

>docker-compose up --build

## OBS.:
A aplicação usa variáveis de ambiente definidas no arquivo docker-compose.yaml
Caso não queira usar o docker, crie novas variáveis de ambiente.

    DATA_BASE: mongo
    MONGO_DB_PORT: 27017
    NODE v12


ou para rodar localmente

>node index.js

### Testes
Para rodar os testes unitários basta exectar o comando
>jest




## Part-2

### Problema:
A primeira parte consiste em um problema de tratamento de dados para elimar dados repetidos e irrelevantes.

### Solução

Construída em NodeJs + Express

Foi criado um serviço que recebe um dump de produtos onde cada linha contém informação do id do produto e a url de sua imagem, entretanto, há mais de uma linha para o mesmo produto. O objetivo do serviço é limpar este dump agrupando-o de forma a ter um array de produtos que contém um array de urls de imagens, já selecionando as imagens válidas (por meio de uma requisição a uuma API fornecida) e limitando a quantidade de urls a 3.

### Desenvolvimento


Para rodar o projeto é necessário instalar as dependências continas no package.json, para isto basta executar o seguinte  na pasta raíz da parte 2.

>npm install 

Para rodar o projeto execute o comando

>node product.js

### Testes
Para rodar os testes unitários basta exectar o comando
>jest