const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'bootStore',
    'root',
    'kunalverma@2004',{
        host: 'localhost',
        dialect: 'mysql'
    }
);
module.exports = sequelize;

// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'bootStore',
//     password: 'kunalverma@2004'
// });

// module.exports = pool.promise();