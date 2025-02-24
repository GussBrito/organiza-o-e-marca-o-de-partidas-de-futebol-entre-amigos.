const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;
const DATA_FILE = 'partidas.json';

app.use(express.json());
app.use(cors());

// ler dados do JSON
const lerPartidas = () => {
    if (!fs.existsSync(DATA_FILE)) return [];
    const data = fs.readFileSync(DATA_FILE);
    return JSON.parse(data);
};

// salvar dados no JSON
const salvarPartidas = (partidas) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(partidas, null, 2));
};

// Rota para listar partidas
app.get('/partidas', (req, res) => {
    res.json(lerPartidas());
});

// Rota para criar uma nova partida
app.post('/partidas', (req, res) => {
    const partidas = lerPartidas();
    const novaPartida = { id: Date.now(), ...req.body };
    partidas.push(novaPartida);
    salvarPartidas(partidas);
    res.status(201).json(novaPartida);
});

// Rota para excluir uma partida
app.delete('/partidas/:id', (req, res) => {
    let partidas = lerPartidas();
    partidas = partidas.filter(p => p.id !== parseInt(req.params.id));
    salvarPartidas(partidas);
    res.json({ message: 'Partida excluída' });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
