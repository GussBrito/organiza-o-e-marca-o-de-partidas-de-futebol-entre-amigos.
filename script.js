document.getElementById("matchForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const teamA = document.getElementById("teamA").value;
    const teamB = document.getElementById("teamB").value;
    const date = document.getElementById("date").value;

    if (teamA && teamB && date) {
        const matchList = document.getElementById("matchList");

        const li = document.createElement("li");
        li.textContent = `Partida: ${teamA} vs ${teamB} | Data: ${date}`;

        matchList.appendChild(li);

        // Limpar campos após adicionar a partida
        document.getElementById("teamA").value = "";
        document.getElementById("teamB").value = "";
        document.getElementById("date").value = "";
    }
});
