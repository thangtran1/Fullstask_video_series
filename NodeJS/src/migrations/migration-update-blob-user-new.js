// đổi image sang blob 

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([ // table muốn thay đổi users: lấy từ mgration-cr-user.js 
            queryInterface.changeColumn('users', 'image', { //your table name ', 'name'
                type: Sequelize.BLOB('long'),
                allowNull: true,
            })
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('users', 'image', {
                type: Sequelize.STRING,
                allowNull: true,
            })
        ])
    }
};