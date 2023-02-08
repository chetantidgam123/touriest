module.exports = (sequelize, DataTypes) => {
    const UserModel = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstname: { type: DataTypes.STRING(50), allowNull: false },
        lastname: { type: DataTypes.STRING(50), allowNull: false },
        email: { type: DataTypes.STRING(100), allowNull: false },
        password: { type: DataTypes.STRING(50), allowNull: false },

    })
    return UserModel
}