import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// CORS aktivieren
app.use(cors());

// Pfad zur JSON-Datei
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbFilePath = path.join(__dirname, 'db.json');

// Hilfsfunktion zum Lesen der JSON-Datei
const readDbFile = () => {
  const data = fs.readFileSync(dbFilePath);
  return JSON.parse(data);
};

// Hilfsfunktion zum Schreiben in die JSON-Datei
const writeDbFile = (data) => {
  fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
};

// Route zum Abrufen aller Besuche
app.get('/visits', (req, res) => {
  const db = readDbFile();
  res.json(db.visits);
});

// Route zum Hinzufügen eines neuen Besuchs
app.post('/visits', (req, res) => {
  const newVisit = req.body;
  const db = readDbFile();
  newVisit.id = db.visits.length ? db.visits[db.visits.length - 1].id + 1 : 1;
  db.visits.push(newVisit);
  writeDbFile(db);
  res.status(201).json(newVisit);
});

// Route zum Löschen eines Besuchs
app.delete('/visits/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const db = readDbFile();
  const index = db.visits.findIndex((visit) => visit.id === id);
  if (index === -1) {
    return res.status(404).send('Visit not found');
  }
  db.visits.splice(index, 1);
  writeDbFile(db);
  res.status(204).send();
});

// Server starten
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
