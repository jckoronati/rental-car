# rental-car
### Tech Stack 

Está aplicação foi realizada com o uso das seguitnes tecnologias:

- NodeJS, Express, Typescript, Docker e Postgres

# App Docs

### API Document

Você pode acessar a documentação através da rota `/api-docs`.

### Migrations

- Para realizar a criação de uma migration o comando que deve ser utilizado é o seguinte `yarn typeorm migration:create src/database/migrations/MigrationExample`
    - Alterar o texto de *MigrationExample* para o nome da migration desejada

- Para rodar as migrations é necessário realizar o seguinte comando `docker-compose exec app node -r ts-node/register ./node_modules/typeorm/cli.js migration:run -d ./data-source`
    - Revert `docker-compose exec app node -r ts-node/register ./node_modules/typeorm/cli.js migration:revert -d ./data-source`
    
Made with love ❤️
