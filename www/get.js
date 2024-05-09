function fetchUserInterest() {
    const namn = document.getElementById("Namn").value;
    fetch(`http://localhost:3001/persons/?name=${namn}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })

    .then(data => {
        const informationList = document.getElementById("Information");
            informationList.innerHTML = "";
            data.interests.forEach(interest => {
                const li = document.createElement("li");
                li.textContent = interest;
                informationList.appendChild(li);
            });
    })
    .catch(error => {
        console.error(error);
    })
}