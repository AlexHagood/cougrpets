const { Client } = require('pg')

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'pets',
    port: '5432',
    password: 'password',
})



const createTableQuery = `
CREATE TABLE users (
    username varchar,
    petname varchar,
    money integer
)
`

function createTable() {

    client.connect();

    client.query(createTableQuery, (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log("Table pets created!");
        client.end();
    })


}

module.exports = {
    createTable: createTable
};