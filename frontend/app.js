// Função para navegar entre as telas do aplicativo
function navigateTo(page) {
    if (page === 'emergencia') {
        if(confirm("Deseja ligar agora para a Defesa Civil (199)?")) {
            window.location.href = 'tel:199';
        }
    } else if (page === 'registrar-risco') {
        window.location.href = 'registrar-risco.html';
    } else if (page === 'abrigos') {
        window.location.href = 'abrigos.html';
    } else if (page === 'doacoes') {
        window.location.href = 'doacoes.html';
    } else if (page === 'documentos') {
        window.location.href = 'documentos.html'; // Direciona para a nova tela de documentos
    } else {
        alert(`A tela de ${page.replace('-', ' ').toUpperCase()} está em desenvolvimento!`);
    }
}

// Função para pegar a localização atual do usuário
function obterLocalizacao() {
    const inputEndereco = document.getElementById('endereco');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                inputEndereco.value = `Lat: ${position.coords.latitude.toFixed(5)}, Lon: ${position.coords.longitude.toFixed(5)} (Localização Atual)`;
            },
            () => { alert('Não foi possível obter a localização. Digite manualmente.'); }
        );
    }
}

function abrirMapa() {
    alert("Iniciando GPS... Redirecionando para a rota mais segura no mapa.");
}

// Configuração dos formulários ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Envio do formulário de Registrar Risco (conversando com o Backend)
    const formRisco = document.getElementById('form-risco');
    if (formRisco) {
        formRisco.addEventListener('submit', async (evento) => {
            evento.preventDefault(); 
            const pacote = {
                endereco: document.getElementById('endereco').value,
                tipo: document.getElementById('tipo-ocorrencia').value,
                descricao: document.getElementById('descricao').value
            };
            try {
                const resposta = await fetch('http://localhost:3000/registrar', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(pacote)
                });
                const resultado = await resposta.json();
                alert(`${resultado.mensagem}\nSeu número de protocolo é: ${resultado.protocolo}`);
                formRisco.reset();
                window.location.href = 'index.html';
            } catch (erro) {
                alert('Erro de conexão: Verifique se o servidor backend está ligado!');
            }
        });
    }

    // 2. Envio do formulário de Documentos Perdidos
    const formDoc = document.getElementById('form-documento');
    if (formDoc) {
        formDoc.addEventListener('submit', (evento) => {
            evento.preventDefault();
            alert("Documento registado com sucesso na central de achados e perdidos!");
            formDoc.reset();
            window.location.href = 'index.html';
        });
    }
});
