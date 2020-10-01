const mysql = require("mysql");
const express = require("express");

parameters = {
    host: "localhost",
    user: "root",
    password: "password",
    database: "nusmoneyapp",
    multipleStatements: true
};
connection = mysql.createConnection(parameters);
connection.connect((error) => {
    if (error){
        console.log(error);
    } else {
        console.log("Connection was successful");
    }
});

var router = express.Router();

//get
router.get("/", (request, response) => {
    connection.query(`select name, marital_status, monthly_income, dependants from users where gender = 'Female' and age_group = '<25'`, 
    (error, result) => {
        if (error) {
            console.log(error);
            response.send("An error has occurred.");
        } else if (result.length == 0) {
            response.send("There are no users with those details.");
        } else {
            response.send(result);
        }
    });
});

module.exports = router;