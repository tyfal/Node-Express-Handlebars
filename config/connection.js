// Set up DB connection
require(`dotenv`).config();
var mysql = require(`mysql`);

var connection = mysql.connection({
    host: `localhost`,
    port: 3306,
    user: `root`,
    password: process.env.PASSWORD,
    database: `burgers_db`
});

// Make connection
connection.connect((err) => {
    if (err) {
        console.log(`err connecting: ${err.stack}`);
        return
    } else {
        connection.log(`connection established as id ${connection.threadId}`);
    }
});

// Export connection for ORM
module.exports = connection;
