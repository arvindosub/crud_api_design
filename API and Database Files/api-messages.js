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
app.get("/messages", (request, response) => {
    if (isNaN(request.body.ref_val)) {
        connection.query(`select ${request.body.sel_col} from messages where ${request.body.ref_col} ${request.body.ref_cond} '${request.body.ref_val}'`, 
        (error, result) => {
            if (error) {
                console.log(error);
                response.send("An error has occurred.");
            } else if (result.length == 0) {
                response.send("There are no messages with those details.");
            } else {
                response.send(result);
            }
        });
    } else {
        connection.query(`select ${request.body.sel_col} from messages where ${request.body.ref_col} ${request.body.ref_cond} ${request.body.ref_val}`, 
        (error, result) => {
            if (error) {
                console.log(error);
                response.send("An error has occurred.");
            } else if (result.length == 0) {
                response.send("There are no messages with those details.");
            } else {
                response.send(result);
            }
        });
    }
});

//post
app.post("/messages", (request, response) => {
    connection.query(`insert into messages (message_id, account_number, nric, remarks, message_date)
    values ('${request.body.message_id}', '${request.body.account_number}', '${request.body.nric}', '${request.body.remarks}', '${request.body.message_date}')`,
    (error, result) => {
        if (error) {
            console.log(error);
            response.send("An error occurred - User with this Account Number / NRIC has not been created yet.");
        } else {
            response.send("Record saved successfully");
        }
    });
});

//put
app.put("/messages", (request, response) => {
    if (isNaN(request.body.chg_val) && isNaN(request.body.rev_val))  {
        connection.query(`update messages set ${request.body.chg_col} = '${request.body.chg_val}' where ${request.body.ref_col} ${request.body.ref_cond} '${request.body.ref_val}'`,
        (error, result) => {
            if (error) {
                console.log(error);
                response.send("An error occurred - please enter the fields in the correct format");
            } else {
                response.send("Record updated successfully");
            }
        });
    } else if (!isNaN(request.body.chg_val) && isNaN(request.body.rev_val))  {
        connection.query(`update messages set ${request.body.chg_col} = ${request.body.chg_val} where ${request.body.ref_col} ${request.body.ref_cond} '${request.body.ref_val}'`,
        (error, result) => {
            if (error) {
                console.log(error);
                response.send("An error occurred - please enter the fields in the correct format");
            } else {
                response.send("Record updated successfully");
            }
        });
    } else if (isNaN(request.body.chg_val) && !isNaN(request.body.rev_val))  {
        connection.query(`update messages set ${request.body.chg_col} = '${request.body.chg_val}' where ${request.body.ref_col} ${request.body.ref_cond} ${request.body.ref_val}`,
        (error, result) => {
            if (error) {
                console.log(error);
                response.send("An error occurred - please enter the fields in the correct format");
            } else {
                response.send("Record updated successfully");
            }
        });
    } else {
        connection.query(`update messages set ${request.body.chg_col} = ${request.body.chg_val} where ${request.body.ref_col} ${request.body.ref_cond} ${request.body.ref_val}`,
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
app.delete("/messages", (request, response) => {
    if (isNaN(request.body.ref_val)) {
        connection.query(`delete from messages where ${request.body.ref_col} ${request.body.ref_cond} '${request.body.ref_val}'`,
        (error, result) => {
            if (error) {
                console.log(error);
                response.send("An error occurred - please enter the fields in the correct format");
            } else {
                response.send("Record(s) deleted successfully");
            }
        });
    } else {
        connection.query(`delete from messages where ${request.body.ref_col} ${request.body.ref_cond} ${request.body.ref_val}`,
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