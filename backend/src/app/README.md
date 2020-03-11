# Pasta App

Aqui fica a maior parte dos códigos que envolvem regra de negócio, lógica ou qualquer outro código da aplicação.

## Model
    - Na pasta model ficam todos os reais e os métodos que os adicionarão, editarão ou excluirão.
    - Não é apresentado diretamente ao usuário, pode ser classificado como o back-end da aplicação.
    - Armazena a abstração do banco, utilizado para manipular dados contidos nas tabelas
    - Não possuem responsabilidade sobre a regra de negocio da aplicação

## Controller
    - Onde ficam todos os arquivos para manipulação de eventos. É o ponto de entrada para eventos e o único mediador entre a view e models.
    - Processa e responde a eventos, geralmente ações do usuário, e invoca alterações no model e, talvez, na view.
    - Ponto de entrada para as requisições da aplicação
    - Uma rota geralmente esta associada diretamente a um método do controller.
    - Pode incluir grande parte das regras de negócio da aplicação
    - Jamais chama outro controller
    - Classe
    - Sempre retorna um JSON
    - Nem todo controller possui um model

    - Possui 5 métodos
      - index: Listar todos os cadastros
      - show: Exibir apenas um cadastro
      - store: Cadastrar
      - update: Atualizar
      - delete: Deletar

    - Cada controller representa um entidade
      - Manipular um usuário (register, delete, update)
      - Logar um usuário (session)

## View
    - Retorno para o usuário/navegador
    - Aplicações sem API a view seria o HTML
    - Aplicações que usam API a view seria o JSON retornado pelo controller
