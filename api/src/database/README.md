# Pasta Database

Pasta onde ficam todos os arquivos referente a base de dados (postgre, MySQL).

Os unicos arquivos da base de dados que não ficam aqui são os de configuração.

## [Sequelize](https://sequelize.org/)

É um ORM.

### ORM
    - É uma forma de abstrair o banco de dados, mudando a forma como a aplicação se comunica com o banco de dados.
    - As tabelas viram models, cada tabela tem seu arquivo .js dentro do projeto,
    - Não utilizamos SQL e sim javascript.

## Migrations
    - Controle de versão para a base de dados
    - Cada arquivo contém instruções para criação, alteração ou remoção de tabelas ou colunas.

## Seeds
    - População da base de dados para desenvolvimento
    - Utilizado para popular dados para testes
    - Jamais é utilizado em produção
