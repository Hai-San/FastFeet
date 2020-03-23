<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src="assets/logo.png" width="300px" />
</h1>

<p align="center">“Um verdadeiro mestre é um eterno aprendiz”!</p>


<h2>Sobre o desafio</h2>

Aplicação completa (back-end, front-end e Mobile) para uma transportadora fictícia, o FastFeet.

* <a href="#detalhes">Detalhes do projeto</a>
* <a href="#back">Back-end</a>
* <a href="#front">Front-end</a>
* <a href="#mobile">Mobile</a>
* <a href="#licença">Licença</a>

<h3>
    <a id="user-content-detalhes" class="anchor" aria-hidden="true" href="#detalhes">
    <svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>
    </a>
    Detalhes do projeto
</h3>

* A plataforma utilizada para desenvolvimento foi windows 10
* A versão Mobile foi desenvolvida apenas para android
* O emulador android utilizado foi o que vem junto com o android studio
    * O emulador pode ser acessado pelo menu "configure -> AVD manager" na tela inicial do android studio.
    * As Especificações do emulador utilizado:
        * Nome: Nexus 5X 5.2 1080x1920 420dpi
        * Modelo: Nexus 5X API 29 x86
        * Android: Android 10.0 x86
    * Nas configurações de camera foi utilizado front "none" e back "virtualScene"

<h3>
    <a id="user-content-back" class="anchor" aria-hidden="true" href="#back">
    <svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>
    </a>
    📝 Configuração do backend
</h3>

1. Instalar a última versão estavel (LTS) do [Node.js](https://nodejs.org/)

2. Instalar o docker [DOCKER](https://docs.docker.com/)

3. Criamos um container do postgres [Postgres](https://hub.docker.com/_/postgres)
    ```bash
    docker run --name databasename -e POSTGRES_PASSWORD=databasepass -p 5432:5432 -d postgres
    ```
    - Baixe o postbird para administrar seu container postgres por uma interface visual
    - Crie um banco de dados com o nome fastfeet ou como preferir, isso reflete no arquivo .env criado posteriormente.

4. Criamos um container do Redis [Redis](https://hub.docker.com/_/redis)
    ```bash
    docker run --name databasename -p 6379:6379 -d -t redis:alpine
    ```

5. Instalar o YARN ou se preferir pode utilizar o NPM que ja vem isntalado com o Node.

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

<h3>
    <a id="user-content-front" class="anchor" aria-hidden="true" href="#front">
    <svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>
    </a>
    📝 Configuração do front-end
</h3>

Dentro da pasta frontend.

1. No terminal execute "yarn" para instalar todos os pacotes
    ```bash
    yarn
    ```
2. Confira a URL da api no arquivo api.js dentro de src/services

3. Agora inicie a aplicação com o seguinte comando:
    ```bash
    yarn start
    ```

<h3>
    <a id="user-content-mobile" class="anchor" aria-hidden="true" href="#mobile">
    <svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>
    </a>
    📝 Configuração do mobile
</h3>

Antes de qualquer coisa siga os passos [Deste tutorial](https://docs.rocketseat.dev/ambiente-react-native/android/windows)
Apenas na parte do emulador eu utilizei outra opção, como foi informado no inicio do README.

1. Inicie o emulador ou conecte o seu dispositivo no computador.
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
    adb reverse tcp:3335 tcp:3335
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

<h3>
    <a id="user-content-licença" class="anchor" aria-hidden="true" href="#licença">
    <svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>
    </a>
    📝 Licença
</h3>

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.
