const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000; // Puedes cambiar el puerto si es necesario

// Middleware
app.use(bodyParser.json());

// Datos simulados (reemplaza esto con una base de datos real)
let items = [];
let nextItemId = 1;

// Rutas CRUD
app.get('/items', (req, res) => {
  res.json(items);
});

app.post('/items', (req, res) => {
  const newItem = { id: nextItemId, text: req.body.text };
  items.push(newItem);
  nextItemId++;
  res.status(201).json(newItem);
});

app.put('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const updatedText = req.body.text;

  const itemToUpdate = items.find(item => item.id === itemId);
  if (itemToUpdate) {
    itemToUpdate.text = updatedText;
    res.json(itemToUpdate);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

app.delete('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  items = items.filter(item => item.id !== itemId);
  res.json({ message: 'Item deleted' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});