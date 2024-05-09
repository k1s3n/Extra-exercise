function showPersons() {
    fetch('http://localhost:3001/allpersons')
    .then(response => response.json())
    .then(data => {
        const personListDiv = document.getElementById("personList");
        // Rensa tidigare innehåll
        personListDiv.innerHTML = "";
        // Skapa och fyll listelement
        const ul = document.createElement("ul");
        data.forEach(person => {
            const li = document.createElement("li");
            li.textContent = `Namn: ${person.name}, Information: ${person.info}`;
            ul.appendChild(li);
        });
        personListDiv.appendChild(ul);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}




document.getElementById("userForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Förhindra standardformulärsskickning

    var formData = new FormData(this); // Hämta formulärdata

    var postData = {
        name: formData.get('name'),
        info: formData.get('info')
    };

    fetch('http://localhost:3001/personas', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    })
    .then(response => response.text())
    .then(data => {
        console.log(data); // Logga serversvaret
        // Visa meddelande
        document.getElementById("message").innerText = "Data har postats!";
        document.getElementById("userForm").reset();
        showPersons();
    })
    .catch(error => {
        console.error('Error:', error);
        // Visa felmeddelande om något går fel
        document.getElementById("message").innerText = "Något gick fel vid postning av data.";
    });
});

document.getElementById("showInfo").addEventListener("click", function() {
    window.location.href = 'get.html';

});

showPersons();