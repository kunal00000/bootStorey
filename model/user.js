const db = require('../util/database');
const Sequelize = require('sequelize');

const User = db.define('users',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull:false
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = User;