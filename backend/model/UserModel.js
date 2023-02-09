module.exports = (sequelize, DataTypes) => {
    const UserModel = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstname: { type: DataTypes.STRING(50), allowNull: false, required: true },
        lastname: { type: DataTypes.STRING(50), allowNull: false, required: true },
        email: { type: DataTypes.STRING(100), allowNull: false, required: true },
        password: { type: DataTypes.STRING(50), allowNull: true, required: false },
        hashPassword: { type: DataTypes.STRING(50), allowNull: true, required: false },
        googleId: { type: DataTypes.STRING(50), allowNull: true, required: false },

    })
    return UserModel
}