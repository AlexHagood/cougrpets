const {Sequelize} = require('sequelize')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db/cougrpets.sqlite'
})

module.exports = sequelize