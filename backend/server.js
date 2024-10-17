// server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('To-Do List API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
