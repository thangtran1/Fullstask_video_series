const { Sequelize } = require('sequelize');


// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('hoidanit', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    "logging": false

    //logging: để mất Executing (default): SELECT 1+1 AS result
});

// async bất đồng bộ
let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = connectDB;
