# Mural do amor - backend

### Backend do projeto para troca de mensagens amorosas.

### Antes de tudo...
- Clone o repósitório
  ```bash
  git clone https://github.com/seuusuario/seuprojeto.git
  cd seuprojeto
  ```

### Requisitos:
- Instalar NodeJS

- Instalar ReactJS

- Instalar Champp para o banco de dados mysql
   - Baixe o Champp em https://www.apachefriends.org/pt_br/index.html
   - Instale normalmente, escolhendo pelo menos o MySQL.
   - Abra o painel do Champp e inicie o módulo MySQL.
   - Crie um banco com nome e senha

- Instalar o Sequelize no NodeJS
  - No terminal
```bash
npm install express sequelize mysql2 dotenv
```
   - No arquivo "models\BD.js"

```bash
const Sequelize = require('sequelize');
const sequelize = new Sequelize('NOME DO BANCO', 'USUARIO', 'SENHA',{
    host: 'NOME DO HOST',
    port: PORTA,
    dialect: 'mysql',
    logging: false
});

module.exports ={Sequelize, sequelize}
```
