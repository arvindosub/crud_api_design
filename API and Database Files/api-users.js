const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const { query } = require("express");

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

app = express();
app.use(bodyParser.json());

//get
app.get("/users", (request, response) => {
    if (isNaN(request.body.ref_val)) {
        connection.query(`select ${request.body.sel_col} from users where ${request.body.ref_col} ${request.body.ref_cond} '${request.body.ref_val}'`, 
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
    } else {
        connection.query(`select ${request.body.sel_col} from users where ${request.body.ref_col} ${request.body.ref_cond} ${request.body.ref_val}`, 
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
    }
});

//post
app.post("/users", (request, response) => {
    connection.query(`insert into users (nric, name, email, password, mobile, gender, age_group, monthly_income, marital_status, dependants, debts_os)
    values ('${request.body.nric}', '${request.body.name}', '${request.body.email}', '${request.body.password}', ${request.body.mobile}, '${request.body.gender}', '${request.body.age_group}', '${request.body.monthly_income}', '${request.body.marital_status}', ${request.body.dependants}, '${request.body.debts_os}')`,
    (error, result) => {
        if (error) {
            console.log(error);
            response.send("An error occurred - NRIC already exists or all fields are not entered correctly");
        } else {
            response.send("Record saved successfully");
        }
    });
});

//put
app.put("/users", (request, response) => {
    if (isNaN(request.body.chg_val) && isNaN(request.body.rev_val)) {
        connection.query(`update users set ${request.body.chg_col} = '${request.body.chg_val}' where ${request.body.ref_col} = '${request.body.ref_val}'`,
        (error, result) => {
            if (error) {
                console.log(error);
                response.send("An error occurred - please enter the fields in the correct format");
            } else {
            response.send("Record updated successfully");
            }
        });
    } else if (!isNaN(request.body.chg_val) && isNaN(request.body.rev_val)) {
        connection.query(`update users set ${request.body.chg_col} = ${request.body.chg_val} where ${request.body.ref_col} = '${request.body.ref_val}'`,
        (error, result) => {
            if (error) {
                console.log(error);
                response.send("An error occurred - please enter the fields in the correct format");
            } else {
                response.send("Record updated successfully");
            }
        });
    } else if (isNaN(request.body.chg_val) && !isNaN(request.body.rev_val)) {
        connection.query(`update users set ${request.body.chg_col} = '${request.body.chg_val}' where ${request.body.ref_col} = ${request.body.ref_val}`,
        (error, result) => {
            if (error) {
                console.log(error);
                response.send("An error occurred - please enter the fields in the correct format");
            } else {
                response.send("Record updated successfully");
            }
        });
    } else {
        connection.query(`update users set ${request.body.chg_col} = ${request.body.chg_val} where ${request.body.ref_col} = ${request.body.ref_val}`,
        (error, result) => {
            if (error) {
                console.log(error);
                response.send("An error occurred - please enter the fields in the correct format");
            } else {
                response.send("Record updated successfully");
            }
        });
    }
});

//delete
app.delete("/users", (request, response) => {
    if (isNaN(request.body.ref_val)) {
        connection.query(`delete from users where ${request.body.ref_col} ${request.body.ref_cond} '${request.body.ref_val}'`,
        (error, result) => {
            if (error) {
                console.log(error);
                response.send("An error occurred - please enter the fields in the correct format");
            } else {
                response.send("Record(s) deleted successfully");
            }
        });
    } else {
        connection.query(`delete from users where ${request.body.ref_col} ${request.body.ref_cond} ${request.body.ref_val}`,
        (error, result) => {
            if (error) {
                console.log(error);
                response.send("An error occurred - please enter the fields in the correct format");
            } else {
                response.send("Record(s) deleted successfully");
            }
        });
    }
});

app.listen(3000);