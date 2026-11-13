function navigateTo(page) {
    if (page === 'registrar-risco') {
        window.location.href = 'registrar-risco.html';
    } else if (page === 'abrigos') {
        window.location.href = 'abrigos.html';
    } else {
        alert(`A tela de ${page.replace('-', ' ').toUpperCase()} será construída em breve!`);
    }
}

// Função da tela de Registrar Risco
function obterLocalizacao() {
    const inputEndereco = document.getElementById('endereco');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                inputEndereco.value = `Lat: ${lat.toFixed(5)}, Lon: ${lon.toFixed(5)} (Localização Atual)`;
            },
            () => {
                alert('Não foi possível obter a localização. Digite manualmente.');
            }
        );
    } else {
        alert('Geolocalização não suportada.');
    }
}

// Função da tela de Abrigos
function abrirMapa() {
    alert("Iniciando GPS... Redirecionando para a rota mais segura no mapa.");
}