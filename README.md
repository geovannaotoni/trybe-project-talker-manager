# Talker Manager
Aplicação que consiste em um cadastro de talkers (palestrantes), no qual é possível cadastrar, visualizar, pesquisar, editar e excluir informações. O projeto desenvolveu uma API de um CRUD (Create, Read, Update e Delete) de palestrantes e desenvolveu endpoints que irão ler e escrever no arquivo `src/talker.json` utilizando o módulo fs.

## :computer: Visualize este projeto:
1. **Com o Doker:**
  - Inicie os containers: `docker-compose up -d`
  - Acesse o terminal do container: `docker exec -it talker_manager bash`
  - Inicie a aplicação: `npm run dev`

2. **Sem Docker:**
  - Inicie a aplicação: `env $(cat .env) npm run dev`

## :bulb: Habilidades:
**Endpoints Criadas:**
1. `GET /talker`
2. `GET /talker/:id`
3. `POST /login` (com a geração de um token aleatório de 16 caracteres)
4. `POST /talker`
5. `PUT /talker/:id`
6. `DELETE /talker/:id`
7. `GET /talker/search` (com o parâmetro de consulta q=searchTerm)
8. `GET /talker/search` (com o parâmetro de consulta rate=rateNumber)
9. `GET /talker/search` (com o parâmetro de consulta date=watchedDate)
10. `PATCH /talker/rate/:id`
11. `GET /talker/db` (utiliza as informações de um banco de dados MySQL para retornar a lista de pessoas palestrantes)

Feito a partir dos conhecimentos de Docker, API REST com Express, Middlewares, CRUD e MySQL.
