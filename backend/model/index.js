const dbConfig = require('../config/dbConfig');

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            aquire: dbConfig.pool.aquire,
            idle: dbConfig.pool.idle
        }
    }
)

sequelize.authenticate()
    .then(() => {
        console.log('connected');
    }).catch(err => console.log(err))

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./UserModel')(sequelize, DataTypes)
db.sequelize.sync({ force: false })
    .then(() => {
        console.log('sync is done');
    })
module.exports = db