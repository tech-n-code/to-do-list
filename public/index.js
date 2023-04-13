let container = document.querySelector("#container");

fetch("/api/tasks")
    .then(response => {
        return response.json();
    })
    .then(tasks => {
        console.log(tasks);
        tasks.forEach(task => {
                console.log("Adding h2 for task:", task.task_body);
                container.innerHTML += `<div class="task-container"><button id="${task.id}">Edit</button><h2>${task.task_body}</h2></div>`;
            });
    });