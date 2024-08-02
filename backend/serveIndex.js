// serveIndex.js
const path = require('path');
const express = require('express');
const router = express.Router();

// Middleware para servir index.html
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'), (err) => {
    if (err) {
      console.error("Error sending file:", err);
      res.status(500).send("Server Error");
    }
  });
});

module.exports = router;
