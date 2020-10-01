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
app.get("/transactions", (request, response) => {
    if (isNaN(request.body.ref_val)) {
        connection.query(`select ${request.body.sel_col} from transactions where ${request.body.ref_col} ${request.body.ref_cond} '${request.body.ref_val}'`, 
        (error, result) => {
            if (error) {
                console.log(error);
                response.send("An error has occurred.");
            } else if (result.length == 0) {
                response.send("There are no transactions with those details.");
            } else {
                response.send(result);
            }
        });
    } else {
        connection.query(`select ${request.body.sel_col} from transactions where ${request.body.ref_col} ${request.body.ref_cond} ${request.body.ref_val}`, 
        (error, result) => {
            if (error) {
                console.log(error);
                response.send("An error has occurred.");
            } else if (result.length == 0) {
                response.send("There are no transactions with those details.");
            } else {
                response.send(result);
            }
        });
    }
});

//post
app.post("/transactions", (request, response) => {
    connection.query(`insert into transactions (transaction_id, account_number, transaction_date, amount, transaction_type, expense_category, recipient)
    values ('${request.body.transaction_id}', '${request.body.account_number}', '${request.body.transaction_date}', ${request.body.amount}, '${request.body.transaction_type}', '${request.body.expense_category}', '${request.body.recipient}')`,
    (error, result) => {
        if (error) {
            console.log(error);
            response.send("An error occurred - User with this NRIC has not been created yet OR this account number/NRIC already exists.");
        } else {
            response.send("Record saved successfully");
        }
    });
});

//put
app.put("/transactions", (request, response) => {
    if (isNaN(request.body.chg_val) && isNaN(request.body.rev_val))  {
        connection.query(`update transactions set ${request.body.chg_col} = '${request.body.chg_val}' where ${request.body.ref_col} ${request.body.ref_cond} '${request.body.ref_val}'`,
        (error, result) => {
            if (error) {
                console.log(error);
                response.send("An error occurred - please enter the fields in the correct format");
            } else {
                response.send("Record updated successfully");
            }
        });
    } else if (!isNaN(request.body.chg_val) && isNaN(request.body.rev_val))  {
        connection.query(`update transactions set ${request.body.chg_col} = ${request.body.chg_val} where ${request.body.ref_col} ${request.body.ref_cond} '${request.body.ref_val}'`,
        (error, result) => {
            if (error) {
                console.log(error);
                response.send("An error occurred - please enter the fields in the correct format");
            } else {
                response.send("Record updated successfully");
            }
        });
    } else if (isNaN(request.body.chg_val) && !isNaN(request.body.rev_val))  {
        connection.query(`update transactions set ${request.body.chg_col} = '${request.body.chg_val}' where ${request.body.ref_col} ${request.body.ref_cond} ${request.body.ref_val}`,
        (error, result) => {
            if (error) {
                console.log(error);
                response.send("An error occurred - please enter the fields in the correct format");
            } else {
                response.send("Record updated successfully");
            }
        });
    } else {
        connection.query(`update transactions set ${request.body.chg_col} = ${request.body.chg_val} where ${request.body.ref_col} ${request.body.ref_cond} ${request.body.ref_val}`,
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
app.delete("/transactions", (request, response) => {
    if (isNaN(request.body.ref_val)) {
        connection.query(`delete from transactions where ${request.body.ref_col} ${request.body.ref_cond} '${request.body.ref_val}'`,
        (error, result) => {
            if (error) {
                console.log(error);
                response.send("An error occurred - please enter the fields in the correct format");
            } else {
                response.send("Record(s) deleted successfully");
            }
        });
    } else {
        connection.query(`delete from transactions where ${request.body.ref_col} ${request.body.ref_cond} ${request.body.ref_val}`,
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