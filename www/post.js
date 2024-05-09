function showPersons() {
    fetch('http://localhost:3001/allpersons')
    .then(response => response.json())
    .then(data => {
        const personTable = document.getElementById("personTable");
                
                // Rensa tidigare innehåll
                personTable.innerHTML = "";

                data.reverse().forEach(person => {
                    const row = document.createElement("tr");
                    const nameCell = document.createElement("td");
                    nameCell.textContent = person.name;
                    const infoCell = document.createElement("td");
                    infoCell.textContent = person.info;
                    
                    row.appendChild(nameCell);
                    row.appendChild(infoCell);
                    
                    personTable.appendChild(row);
        });
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