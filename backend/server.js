const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config();

console.log('MongoDB URI:', process.env.MONGODB_URI);
console.log('Email User:', process.env.EMAIL_USER);
console.log('Email Pass:', process.env.EMAIL_PASS);


const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => {
    console.error('Error al conectar a MongoDB:', err.message);
    console.error('Stack Trace:', err.stack);
  });

// Configuración de Nodemailer
const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false, // Debe ser false para el puerto 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    ciphers: 'SSLv3'
  }
});


// Definir esquemas y modelos para la base de datos
const informacionSchema = new mongoose.Schema({
  seccion: { type: String, required: true },
  categorias: { type: [String], required: true },
  titulo: { type: String, required: true },
  subtitulo: { type: String, required: false },
  adicional: { type: String, required: false },
  parrafo: { type: [String], required: false },
  imagen: { type: String, required: false },
  usuario: { type: String, required: false },
  tiempo: { type: String, required: false },
  estrellas: { type: Number, required: false },
});

const Informacion = mongoose.model("Informacion", informacionSchema, "informacion");

const contactoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true },
  mensaje: { type: String, required: true },
  fecha: { type: Date, default: Date.now },
});

const Contacto = mongoose.model("Contacto", contactoSchema);

// Ruta para manejar el formulario de contacto
app.post('/api/contacto', async (req, res) => {
  console.log("POST /api/contacto request received");
  const { nombre, email, mensaje } = req.body;
  console.log("Received data:", { nombre, email, mensaje });

  try {
    // Guardar los datos en la base de datos
    const nuevoContacto = new Contacto({ nombre, email, mensaje });
    await nuevoContacto.save();
    console.log("Contacto saved successfully");

    // Enviar correo electrónico
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'yokoeventosprueba@hotmail.com',
      subject: 'Nuevo mensaje de contacto',
      text: `Nombre: ${nombre}\nEmail: ${email}\nMensaje: ${mensaje}`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
    res.status(200).json({ message: 'Formulario enviado correctamente y correo enviado' });
  } catch (error) {
    console.error('Error al enviar el correo:', error.message);
    console.error('Stack Trace:', error.stack);
    res.status(500).json({ message: 'Hubo un problema al enviar el formulario' });
  }
});


// Ruta para obtener información
app.get('/api/info', async (req, res) => {
  console.log("GET /api/info request received");
  try {
    const data = await Informacion.find({});
    console.log("Data fetched successfully:", data);
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    console.error('Stack Trace:', error.stack);
    res.status(500).json({ message: 'Error fetching data' });
  }
});

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, '../dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Middleware para manejo de errores
app.use((err, req, res, next) => {
  console.error("Server error:", err.message);
  console.error("Stack Trace:", err.stack);
  res.status(500).send("Something broke!");
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
