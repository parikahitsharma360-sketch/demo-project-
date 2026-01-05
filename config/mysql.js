const mysql = require("mysql2");
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'e_commerce',

});

db.connect ((err) => {
    if(err){
    console.log("connection error", err);
    return;
}
console.log("mysql connected sucessfully!");


});

console.log("show databases")