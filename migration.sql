DROP TABLE IF EXISTS task;

CREATE TABLE task (
    id SERIAL PRIMARY KEY,
    task_body TEXT,
    completed BOOLEAN DEFAULT false 
);