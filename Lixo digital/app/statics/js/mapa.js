document.addEventListener("DOMContentLoaded", function () {
    const map = L.map('map').setView([-23.55052, -46.633308], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    function carregarLocais() {
        fetch('/locais')
            .then(response => response.json())
            .then(locais => {
                locais.forEach(local => {
                    adicionarMarcador(local.nome, local.latitude, local.longitude);
                    adicionarNaLista(local.nome, local.latitude, local.longitude);
                });
            });
    }

    function adicionarMarcador(nome, lat, lon) {
        const marker = L.marker([lat, lon]).addTo(map);
        marker.bindPopup(`<b>${nome}</b>`);
    }

    function adicionarNaLista(nome, lat, lon) {
        const lista = document.getElementById("lista-locais");
        const item = document.createElement("li");
        item.textContent = nome;
        item.addEventListener("click", () => {
            map.setView([lat, lon], 15);
        });
        lista.appendChild(item);
    }

    document.getElementById("form-adicionar").addEventListener("submit", function (e) {
        e.preventDefault();
        const nome = document.getElementById("nome").value;
        const endereco = document.getElementById("endereco").value;
    
        console.log("Dados enviados:", nome, endereco); // Debug
    
        fetch("/add_local", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `nome=${encodeURIComponent(nome)}&endereco=${encodeURIComponent(endereco)}`
        })
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert(data.erro);
            } else {
                alert("Local adicionado com sucesso!");
                document.getElementById("form-adicionar").reset();
            }
        })
        .catch(error => console.error("Erro:", error));
    });    

    carregarLocais();
});
