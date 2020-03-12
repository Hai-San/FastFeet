<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src="assets/logo.png" width="300px" />
</h1>

<p align="center">“Um verdadeiro mestre é um eterno aprendiz”!</p>


* <a href="#sobre-o-desafio">Sobre o desafio</a>
* <a href="#instalação">Instalação</a>
* <a href="#licença">Licença</a>


## 🚀 Sobre o desafio

Aplicação completa (back-end, front-end e Mobile) para uma transportadora fictícia, o FastFeet.

## Detalhes do projeto

* A plataforma utilizada foi windows 10
* A versão Mobile foi desenvolvida apenas para android
* O emulador android utilizado foi o que vem junto com o android studio
    * O emulador pode ser acessado pelo menu "configure -> AVD manager" na tela inicial do android studio.
    * As Especificações do emulador utilizado:
        * Nome: Nexus 5X 5.2 1080x1920 420dpi
        * Modelo: Nexus 5X API 29 x86
        * Android: Android 10.0 x86
    * Nas configurações de camera foi utilizado front "none" e back "virtualScene"

### 📝 Configuração do backend

1. Instalar a última versão estavel (LTS) do [Node.js](https://nodejs.org/)

2. Instalar o docker [DOCKER](https://docs.docker.com/)

3. Criamos um container do postgres [Postgres](https://hub.docker.com/_/postgres)
    - docker run --name databasename -e POSTGRES_PASSWORD=databasepass -p 5432:5432 -d postgres
    - Baixe o postbird para administrar seu container postgres por uma interface visual
    - Crie um banco de dados com o nome fastfeet ou como preferir

4. Criamos um container do Redis [Redis](https://hub.docker.com/_/redis)
    - docker run --name databasename -p 6379:6379 -d -t redis:alpine

5. Instalar o YARN ou se preferir pode utilizar o NPM que ja vem isntalado com o Node, porém o tutorial será feito baseado no yarn.

6. No terminal, dentro da pasta backend nós executamos "yarn" para instalar todos os pacotes
    ```sh
    yarn
    ```
7. Crie o arquivo {.env} seguindo a estrutura do arquivo {.env.example} e preencha as variaveis que estão vazias.
    - Para o sistema de e-mails foi utilizado o [Mailtrap](https://mailtrap.io/)

8. Crie as tabelas dentro do banco de dados postgres:
    ```bash
    yarn sequelize db:migrate
    ```
9. Cadastre o Admin padrão do sistema:
    ```bash
    yarn sequelize db:seed:all
    ```

### 📝 Iniciando a aplicação backend
1. Inicie a conecção do backend com o banco postgres:
    ```bash
    yarn dev
    ```
2. Abra um segundo terminal para iniciar o sistema de gerenciamento de envio de e-mails em filas utilizando o redis.
    ```bash
    yarn queue
    ```
Caso de algum problema de conexao, tenha certeza que todos os bancos estão ativos no docker usando o seguinte comando:
```bash
docker ps -a
```
Este comando lista os containers ativos e inativos, na coluna STATUS se tiver com "Up" e o tempo de atividade então está tudo certo. Se a coluna estiver com "exited" então nós devemos startar o container utilizando o ID na coluna CONTAINER ID:
```bash
docker start <containerid>
```

A partir de agora, se tudo ocorreu sem problemas nós já podemos ir para a configuração do front-end

### 📝 Configuração do front-end

Dentro da pasta frontend.

1. No terminal execute "yarn" para instalar todos os pacotes
    ```bash
    yarn
    ```
2. Crie um arquivo .env e aplique as mesmas variaveis no arquivo .env.example

3. Agora inicie a aplicação com o seguinte comando:
    ```bash
    yarn start
    ```

### 📝 Configuração do mobile

1. Antes de qualquer coisa inicie o emulador ou conecte o seu dispositivo no computador.
2. Confira a URL da api no arquivo api.js dentro de src/services
3. Inicie o android debug bridge:
    ```bash
    adb devices
    ```
    Este comando inicia o daemon caso não esteja ativo e mostra os devices ativos para conexão.

4. Agora rode o seguinte comando para liberar as portas que o emulador precisa acessar.
    ```bash
    adb reverse tcp:8081 tcp:8081
    ```
    No meu caso eu libero as seguintes portas:
    ```bash
    adb reverse tcp:8081 tcp:8081
    adb reverse tcp:9090 tcp:9090
    adb reverse tcp:3334 tcp:3334
    ```

    ##### Dentro da pasta mobile.
    

5. No terminal execute "yarn" para instalar todos os pacotes
    ```bash
    yarn
    ```
6. Agora para instalar a aplicação no emulador.
    ```bash
    react-native run-android
    ```
7. Depois que a aplicação estiver instalada e precisar iniciar a conexão novamente utilize:
    ```bash
    react-native start
    ```
PS: Caso ocorra algum problema a instalação, entre pelo terminal na pasta android e execute o seguinte comando:
```bash
./gradlew clean
```

## 📝 Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.
