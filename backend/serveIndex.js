const path = require('path');
const express = require('express');
const router = express.Router();

// Middleware para servir index.html
router.get('*', (req, res) => {
  const filePath = path.join(__dirname, '../dist', 'index.html');
  console.log('Serving index.html from:', filePath);

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("Error sending file:", err);
      res.status(500).send("Server Error");
    }
  });
});

module.exports = router;
