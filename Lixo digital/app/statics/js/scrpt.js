const map = L.map('map').setView([ -23.5505, -46.6333 ], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

fetch('/get_locais')
    .then(response => response.json())
    .then(locais => {
        locais.forEach(local => {
            const marker = L.marker([local[2], local[3]]).addTo(map);
            marker.bindPopup(`<b>${local[0]}</b><br>${local[1]}`);
        });
    });

map.on('click', function(e) {
    const lat = e.latlng.lat;
    const lon = e.latlng.lng;

    const nomeLocal = prompt('Digite o nome do local de descarte:');
    const descricaoLocal = prompt('Digite uma descrição para este local:');

    if (nomeLocal && descricaoLocal) {
        const marker = L.marker([lat, lon]).addTo(map);
        marker.bindPopup(`<b>${nomeLocal}</b><br>${descricaoLocal}`);

        fetch('/add_local', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `name=${nomeLocal}&description=${descricaoLocal}&latitude=${lat}&longitude=${lon}`
        }).then(response => response.json())
          .then(data => console.log('Local adicionado com sucesso'));
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // Captura os cliques na barra de navegação
    document.querySelectorAll('.navbar a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Impede o comportamento padrão
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Faz a rolagem suave até a seção desejada
                window.scrollTo({
                    top: targetElement.offsetTop - 50, // Ajuste para a barra de navegação
                    behavior: 'smooth'
                });

                // Se for a seção do mapa, reajusta o tamanho após um pequeno delay
                if (targetId === 'mapa') {
                    setTimeout(() => {
                        map.invalidateSize();
                    }, 500);
                }
                if (targetId === 'quiz') {
                    setTimeout(() => {
                        map.invalidateSize();
                    }, 500);
                }
            }
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    // Inicializando o mapa
    var map = L.map('map').setView([-23.55052, -46.633308], 12); // Posição inicial (São Paulo, exemplo)

    // Adicionando o mapa base do OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    // Lista de locais de descarte (exemplo)
    var locais = [
        { nome: "Ecoponto Central", lat: -23.55052, lng: -46.633308 },
        { nome: "Coleta Sustentável", lat: -23.5629, lng: -46.6544 }
    ];

    // Adicionando os marcadores ao mapa
    locais.forEach(local => {
        L.marker([local.lat, local.lng])
            .addTo(map)
            .bindPopup(`<b>${local.nome}</b><br>Local de descarte`);
    });

    // Adicionar novo local ao clicar no botão
    document.getElementById("add-location-btn").addEventListener("click", function () {
        map.once('click', function (event) {
            var lat = event.latlng.lat;
            var lng = event.latlng.lng;

            var nomeLocal = prompt("Digite o nome do local:");
            if (nomeLocal) {
                L.marker([lat, lng])
                    .addTo(map)
                    .bindPopup(`<b>${nomeLocal}</b><br>Local de descarte`);

                alert("Local adicionado com sucesso!");
            }
        });
    });
});
