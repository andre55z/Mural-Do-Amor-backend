const Sequelize = require('sequelize');
const sequelize = new Sequelize('railway', 'root', 'UaKONbLoQgTpzXJCQSIrHJVxztNJqKMI',{
    host: 'crossover.proxy.rlwy.net',
    port: 46293,
    dialect: 'mysql',
    logging: false
});

module.exports ={Sequelize, sequelize}
