# API CRUD

## Introdução

Esta API abrange todos os fundamentos do CRUD (Create, Read, Update, Delete):

- **Create**: Criar um novo usuário.
- **Read**: Ler um usuário com base no e-mail fornecido.
- **Update**: Atualizar um usuário com base no ID fornecido.
- **Delete**: Deletar um usuário com base no ID fornecido.

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/Gabriel-zet/crud-api.git

2. Instale as Dependencias
   - **npm i**

## Uso

3. Criar um novo usuário
POST /create
Envie um payload JSON contendo os dados do novo usuário.

4. Ler um usuario.
POST  /view
Envie um payload JSON contendo um email para ver os dados do usuario especifico.
 * { "email": "email@email.teste"}

5. Atualizar um usuario.
Post /update
Envie uma payload JSON com o id e os dados que você quer mudar. O id é o identificador

6. Deletar um usuario.
Post /delete
Envie uma payload JSON com o id para deletar tal usuario.
