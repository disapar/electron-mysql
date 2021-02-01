const mysql = require('promise-mysql');


const conection = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"",
    database: "electroncrud"
})

function getConection(){
    return conection
}

module.exports = { getConection};