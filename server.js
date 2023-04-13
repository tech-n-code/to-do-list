import express from "express";
import dotenv from "dotenv";
import pg from "pg";
const { Pool } = pg;

const app = express();
app.use(express.static("public"));

dotenv.config();
const port = process.env.PORT || 3000;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 5
});

app.use(express.json());

app.get("/test", (req, res) => {   
    res.send("Hello, world!");
});

app.get('/api/tasks', (req, res) => {
    pool.query(`SELECT * FROM task`, function(err, result) {
        console.log(err ? err : result.rows)
        res.json(result.rows)
    })
})

app.get('/api/task/:id', (req, res) => {
    const id = req.params.id;
    pool.query(`SELECT * FROM task WHERE id = $1`, [id], function(err, result) {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading task');
        } else if (result.rows.length === 0) {
            console.log(`Task with id ${id} not found`);
            res.status(404).send(`Task with id ${id} not found`);
        } else {
            console.log(result.rows);
            res.json(result.rows);
        }
    })
})

app.post('/api/task', function(req, res) {
    const { task_body } = req.body;
    pool.query(`INSERT INTO task (task_body) VALUES ($1)`, [task_body], function(err, result) {
        if (err) {
            console.error(err);
            res.status(500).send('Error creating task');
        } else {
            console.log(result.rows);
            res.status(201).send("Task created successfully");
        }
    })
})

app.put('/api/task/:id', function(req, res) {
    const id = req.params.id;
    const { task_body, completed } = req.body;
    pool.query('UPDATE task SET task_body=$1, completed=$2 WHERE id=$3', [task_body, completed, id], function(err, result) {
        if (err) {
            console.error(err);
            res.status(500).send('Error updating task');
        } else {
            console.log(result);
            res.status(200).send('Task updated successfully');
        }
    });
});

app.delete('/api/task/:id', function(req, res) {
    const id = req.params.id;
    pool.query('DELETE FROM task WHERE id = $1', [id], function(err, result) {
        if (err) {
            console.error(err);
            res.status(500).send("Error deleting task");
        } else {
            console.log(result.rows);
            res.status(204).send("Task deleted successfully");
        }
    });
});

app.listen(port, function(err) {
    if (err) {
        console.error(err);
    } else {
        console.log(`Server started on port ${port}`);
    }
});