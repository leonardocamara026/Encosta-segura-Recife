const express = require('express');
const cors = require('cors');
const fs = require('fs'); // Ferramenta do Node.js para ler e escrever arquivos no computador
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Caminho do arquivo onde vamos guardar os dados
const arquivoBanco = path.join(__dirname, 'ocorrencias.json');

// Rota de teste
app.get('/', (req, res) => {
    res.send('O motor está ligado! Backend do EncostaSegura Recife online! 🚀');
});

// 1. ROTA PARA REGISTRAR O RISCO E SALVAR NO ARQUIVO
app.post('/registrar', (req, res) => {
    const novoRisco = {
        id: Math.floor(Math.random() * 100000),
        endereco: req.body.endereco,
        tipo: req.body.tipo,
        descricao: req.body.descricao,
        data: new Date().toLocaleString('pt-BR')
    };

    // Lê os dados que já estavam salvos (se houver)
    let listaOcorrencias = [];
    if (fs.existsSync(arquivoBanco)) {
        const dadosArquivo = fs.readFileSync(arquivoBanco, 'utf8');
        listaOcorrencias = JSON.parse(dadosArquivo);
    }

    // Adiciona o novo risco na lista
    listaOcorrencias.push(novoRisco);

    // Salva a lista atualizada de volta no arquivo JSON
    fs.writeFileSync(arquivoBanco, JSON.stringify(listaOcorrencias, null, 2));

    console.log("🚨 NOVO ALERTA SALVO NA DESPENSA:", novoRisco);

    res.json({
        mensagem: "Risco registrado e salvo com sucesso pela Defesa Civil!",
        protocolo: novoRisco.id
    });
});

// 2. ROTA PARA O PROFESSOR VER OS DADOS SALVOS
app.get('/ocorrencias', (req, res) => {
    if (!fs.existsSync(arquivoBanco)) {
        return res.json([]);
    }
    const dadosArquivo = fs.readFileSync(arquivoBanco, 'utf8');
    res.json(JSON.parse(dadosArquivo));
});

const PORTA = 3000;
app.listen(PORTA, () => {
    console.log(`Servidor rodando com sucesso! Acesse: http://localhost:${PORTA}`);
});
