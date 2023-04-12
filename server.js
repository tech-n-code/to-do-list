import express from "express";
import dotenv from "dotenv";
import pg from "pg";
const { Client } = pg;
const { Pool } = pg;

const app = express();
app.use(express.static("public"));  //<-- right after `app` is created and before routes

dotenv.config();  //<-- has to be before 'process.env' is called
const port = process.env.PORT || 3000;

const client = new Client(process.env.DATABASE_URL);
client.connect();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 5 //<--max num of connections, change as needed
});

app.use(express.json());  //<--has to be before routes

app.get("/", function(req, res) {   
    res.send("Hello, world!");
});

app.get('/api/test', function(req, res) {
    pool.query(`SELECT * FROM person`, function(err, response) {
        console.log(err ? err : response.rows)
        res.json(response.rows)
    })
})

app.listen(port, function(err) {
    if (err) {
        console.error(err);
    } else {
        console.log(`Server started on port ${port}`);
    }
});