const bd = require('./BD.js');
const Usuario = bd.sequelize.define('recado', {
    id:{
        type: bd.Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: bd.Sequelize.STRING,
        allowNull: false
    },
    mensagem:{
        type: bd.Sequelize.TEXT,
        allowNull: false
    },
    data:{
        type: bd.Sequelize.STRING,
        allowNull: false
    },
    data_edicao:{
        type: bd.Sequelize.STRING
    }


})

Usuario.sync();

module.exports = Usuario;