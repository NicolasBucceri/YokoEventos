const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config();

const app = express();
const port = process.env.PORT || 10000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection with mongoose
const uri = process.env.MONGODB_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});

// Configurar nodemailer
const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Definir el esquema para los párrafos
const ParrafoSchema = new mongoose.Schema({
  texto: String,  // Ajusta el tipo según el formato de los párrafos en tu base de datos
});

// Definir el esquema para las categorías
const CategoriaSchema = new mongoose.Schema({
  titulo: String,
  subtitulo: String,
  adicional: String,
  parrafo: [ParrafoSchema],  // Array de párrafos
});

// Definir el esquema principal
const InformacionSchema = new mongoose.Schema({
  seccion: String,
  categorias: [CategoriaSchema],  // Array de categorías
});

const Informacion = mongoose.model('Informacion', InformacionSchema);

// Rutas API
app.get('/api/info', async (req, res) => {
  console.log('GET /api/info request received');
  try {
    const info = await Informacion.find();
    console.log('Info retrieved:', info);
    res.json(info);
  } catch (err) {
    console.error('Error retrieving info:', err);
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/contacto', async (req, res) => {
  const { nombre, email, mensaje } = req.body;
  const nuevoContacto = new Contacto({ nombre, email, mensaje });

  try {
    await nuevoContacto.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'Nuevo mensaje de contacto desde tu sitio web',
      text: `Nombre: ${nombre}\nEmail: ${email}\nMensaje: ${mensaje}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Error al enviar el mensaje' });
      } else {
        console.log('Email sent:', info.response);
        res.status(201).json({ message: 'Mensaje enviado con éxito' });
      }
    });
  } catch (err) {
    console.error('Error saving contact:', err);
    res.status(500).json({ message: 'Error al enviar el mensaje' });
  }
});

// Servir archivos estáticos desde `dist`
app.use(express.static(path.join(__dirname, '../dist')));

// Manejar cualquier otra ruta con el index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'), (err) => {
    if (err) {
      console.error('Error sending file:', err);
      res.status(500).send('Server Error');
    }
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).send('Something broke!');
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
