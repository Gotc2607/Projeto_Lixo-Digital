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
        const endereco = document.getElementById("endereco").value;

        // Chamando a API Nominatim para obter coordenadas a partir do endereço
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const lat = data[0].lat;
                    const lon = data[0].lon;

                    // Enviar para o backend
                    fetch('/add_local', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        body: `nome=${endereco}&latitude=${lat}&longitude=${lon}`
                    }).then(response => response.json())
                      .then(data => {
                          adicionarMarcador(endereco, lat, lon);
                          adicionarNaLista(endereco, lat, lon);
                          document.getElementById("form-adicionar").reset();
                      });
                } else {
                    alert("Endereço não encontrado! Tente ser mais específico.");
                }
            });
    });

    carregarLocais();
});
