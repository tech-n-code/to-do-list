let container = document.querySelector(".container");

fetch("/api/test")
    .then(function (response) {
        return response.json();
    })
    .then(function (persons) {
        console.log(persons);
        persons.forEach(function (person) {
            console.log("Adding h2 for person:", person);
            container.innerHTML += `<h2>${person.name}</h2>`;
        });
    });