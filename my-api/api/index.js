const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Abilita CORS se necessario
app.use(cors());

// Endpoint per restituire i dati dal file db.json
app.get('/api/users', (req, res) => {
  // Usa un percorso relativo per db.json
  const dbPath = path.join(__dirname, 'db.json');

  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Errore nella lettura del file db.json:', err);
      res.status(500).send('Errore nel server');
      return;
    }

    try {
      const users = JSON.parse(data);
      res.json(users);
    } catch (parseErr) {
      console.error('Errore nel parsing del file db.json:', parseErr);
      res.status(500).send('Errore nel server');
    }
  });
});

// Avvio del server
app.listen(port, () => {
  console.log(`Server in ascolto su http://localhost:${port}`);
});
