module.exports = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: '',
    DB: 'travel_touriest',
    dialect: 'mysql',
    pool: {
        max: 50,
        min: 0,
        aquire: 30000,
        idle: 10000
    }
}