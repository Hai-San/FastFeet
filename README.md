<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src="assets/logo.png" width="300px" />
</h1>

<p align="center">“Um verdadeiro mestre é um eterno aprendiz”!</p>


* <a href="#sobre-o-desafio">Sobre o desafio</a>
* <a href="#instalação">Instalação</a>
* <a href="#licença">Licença</a>


## 🚀 Sobre o desafio

Aplicação completa (back-end, front-end e Mobile) para uma transportadora fictícia, o FastFeet.

## 📝 Configuração do backend

Primeiro temos que instalar todas as dependencias do back-end.

1 - Instalar a última versão estavel (LTS) do [Node.js](https://nodejs.org/)

2 - Instalar o docker [DOCKER](https://docs.docker.com/)

3 - Criamos um container do postgres [Postgres](https://hub.docker.com/_/postgres)
    - docker run --name databasename -e POSTGRES_PASSWORD=databasepass -p 5432:5432 -d postgres
    - Baixe o postbird para administrar seu container postgres por uma interface visual
    - Crie um banco de dados com o nome fastfeet ou como preferir

4 - Criamos um container do Redis [Redis](https://hub.docker.com/_/redis)
    - docker run --name databasename -p 6379:6379 -d -t redis:alpine

5 - Instalar o YARN ou se preferir pode utilizar o NPM que ja vem isntalado com o Node, porém o tutorial será feito baseado no yarn.

6 - Na linha de comando, dentro da pasta backend nós executamos "yarn" para instalar todos os pacotes

    ```bash
    $ yarn
    ```
7 - Criamos o arquivo .env seguindo a estrutura do arquivo .env.example e preenchemos as variaveis que estão vazias.
    - Para o sistema de e-mails foi utilizado o [Mailtrap](https://mailtrap.io/)

8 - Criamos as tabelas dentro do banco de dados postgres:

    ```bash
    $ yarn sequelize db:migrate
    ```
9 - Cadastramos o Admin padrão do sistema:

    ```bash
    $ yarn sequelize db:seed:all
    ```

## 📝 Iniciando a aplicação backend
Agora precisamos iniciar a conecção do backend com o banco postgres:

    ```bash
    $ yarn dev
    ```

Abra outro terminal para iniciar o sistema de gerenciamento de envio de e-mails em filas utilizando o redis.
    ```bash
    $ yarn queue
    ```
Caso de algum problema de conexao, tenha certeza que todos os bancos estão ativos no docker usando o seguinte comando:

    ```bash
    $ docker ps -a
    ```
    Este comando lista os containers ativos e inativos, na coluna STATUS se tiver com "Up" e o tempo de atividade então está tudo certo. Se a coluna estiver com "exited" então nós devemos startar o container utilizando o ID na coluna CONTAINER ID:

    ```bash
    $ docker start <containerid>
    ```

## 📝 Configuração do front-end

Dentro da pasta frontend.

No terminal execute "yarn" para instalar todos os pacotes

    ```bash
    $ yarn
    ```
Crie um arquivo .env e aplique as mesmas variaveis no arquivo .env.example

Agora inicie a aplicação com o seguinte comando:

    ```bash
    $ yarn start
    ```

## 📝 Instalação Mobile

PS: A aplicação mobile foi feita apenas para Android. 
 - Todos os testes foram feito utilizando o AVD manager do android studio
 - O AVD utilizado foi:
    - Nexus 5X API 29 x86
    - Nexus 5X 5.2 1080x1920 420dpi
    - Android 10.0 x86
- Nas configurações de camera foi utilizado front "none" e back "virtualScene"

Antes de qualquer coisa inicie o emulador ou conecte o seu dispositivo no computador.

Confira a URL da api no arquivo api.js dentro de src/services

Inicie o android debug bridge:

    ```bash
    $ adb devices
    ```
Este comando inicia o daemon caso não esteja ativo e mostra os devices ativos para conexão.

Agora rode o seguinte comando para liberar as portas que o emulador precisa acessar.

    ```bash
    $ adb reverse tcp:8081 tcp:8081
    ```
No meu caso eu libero as seguintes portas:
    ```bash
    $ adb reverse tcp:8081 tcp:8081
    $ adb reverse tcp:9090 tcp:9090
    $ adb reverse tcp:3334 tcp:3334
    ```

Dentro da pasta mobile.

No terminal execute "yarn" para instalar todos os pacotes

    ```bash
    $ yarn
    ```
Agora para instalar a aplicação no emulador.
    ```bash
    $ react-native run-android
    ```
Caso ocorra algum problema a instalação, entre pelo terminal na pasta android e execute o seguinte comando:
    ```bash
    $ ./gradlew clean
    ```
Depois que a aplicação estiver instalada e precisar iniciar a conexão novamente utilize:
    ```bash
    $ react-native start
    ```

## 📝 Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.
