## NUS FinTechSG Programme

# CRUD API Design and Querying

1. End-to-End Delivery of CRUD API with backend MySQL connectivity
2. Backend querying of MySQL database using Javascript + Postman

----------------------------------------------------------------------------------------------------------

## [END-TO-END DELIVERY OF CRUD API]

REFER TO THE BACKEND AND FRONTEND FOLDERS.
1. OPEN CMD PROMPT, NAVIGATE TO THE BACKEND FOLDER AND RUN "npm start".
1. REPEAT FOR FRONTEND FOLDER IN A NEW CMD PROMPT WINDOW.
2. MYSQL QUERY RESULTS SHOULD OPEN UP IN A NEW BROWSER WINDOW (SIMULATED FRONTEND).
3. GO TO /backend/routes/mypage.js TO AMEND THE QUERY. **CURRENTLY WORKING ON A WAY TO RECEIVE QUERIES FROM FRONT-END.

----------------------------------------------------------------------------------------------------------

## [DATABASE CREATION AND QUERYING AT BACKEND]

REFER TO FILES IN THE "API and Database Files" FOLDER.
1. CREATE A MYSQL DATABASE, LOADING THE DATA FROM THE 4 SQL FILES INTO 4 TABLES.
2. RUN THE API FILES FROM CMD PROMPT USING "node <filename>.js".
3. USE POSTMAN TO PERFORM QUERIES. USE THE FOLLOWING QUERIES FOR EACH API.


**users**

---get---
{
    "sel_col" : "name, nric, dependants",
    "ref_col" : "nric",
    "ref_cond" : "like",
    "ref_val" : "S9%"
}

--post--
{
    "nric" : "S1234567A",
    "name" : "John Mone",
    "email" : "jmoney@mfam.com",
    "password" : "jomone",
    "mobile" : 97845578,
    "gender" : "Male",
    "age_group" : "25-45",
    "monthly_income" : "5-10k",
    "marital_status" : "M",
    "dependants" : 4,
    "debts_os" : ">12 x monthly pay"
}

--put--
{
    "chg_col" : "password",
    "chg_val" : "ezpz",
    "ref_col" : "nric",
    "ref_cond" : "=",
    "ref_val" : "S1234567A"
}

--delete--
{
    "ref_col" : "nric",
    "ref_cond" : "=",
    "ref_val" : "S1234567A"
}


**accounts**

---get---
{
    "sel_col" : "name, nric, dependants",
    "ref_col" : "nric",
    "ref_cond" : "like",
    "ref_val" : "S9%"
}

--post--
{
    "account_number" : "999991101-8",
    "nric" : "S1234567A",
    "account_type" : "savings",
    "balance" : 50000,
    "max_limit" : 1000000,
    "date_created" : "2018-01-01",
    "last_activity" : "2018-03-26"
}

--put--
{
    "chg_col" : "max_limit",
    "chg_val" : 500000,
    "ref_col" : "nric",
    "ref_cond" : "=",
    "ref_val" : "S1234567A"
}

--delete--
{
    "ref_col" : "nric",
    "ref_cond" : "=",
    "ref_val" : "S1234567A"
}


**transactions**

---get---
{
    "sel_col" : "account_number, transaction_id, amount",
    "ref_col" : "account_number",
    "ref_cond" : "=",
    "ref_val" : "989210982-1"
}

--post--
{
    "transaction_id" : "4571-9967",
    "account_number" : "999991101-8",
    "transaction_date" : "2018-12-31",
    "amount" : 50,
    "transaction_type" : "paywave",
    "expense_category" : "food",
    "recipient" : "Spizza"
}

--put--
{
    "chg_col" : "amount",
    "chg_val" : 40,
    "ref_col" : "transaction_id",
    "ref_cond" : "=",
    "ref_val" : "4571-9967"
}

--delete--
{
    "ref_col" : "transaction_id",
    "ref_cond" : "=",
    "ref_val" : "4571-9967"
}


**messages**

---get---
{
    "sel_col" : "account_number, message_id, remarks",
    "ref_col" : "account_number",
    "ref_cond" : "=",
    "ref_val" : "989210982-1"
}

--post--
{
    "message_id" : "99-893-3459",
    "account_number" : "999991101-8",
    "nric" : "S1234567A",
    "remarks" : "expense_summary",
    "message_date" : "2018-12-31"
}

--put--
{
    "chg_col" : "remarks",
    "chg_val" : "promotions",
    "ref_col" : "message_id",
    "ref_cond" : "=",
    "ref_val" : "99-893-3459"
}

--delete--
{
    "ref_col" : "message_id",
    "ref_cond" : "=",
    "ref_val" : "99-893-3459"
}