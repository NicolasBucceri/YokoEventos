const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config();

const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;
console.log('MongoDB URI:', process.env.MONGODB_URI);

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
    console.error('Stack Trace:', err.stack);
  });

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

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
  mensaje: { type: String, required: true }
});

const Contacto = mongoose.model("Contactos", contactoSchema, "contactos");

app.post("/api/contacto", async (req, res) => {
  console.log("POST /api/contacto request received");
  const { nombre, email, mensaje } = req.body;
  console.log("Received data:", { nombre, email, mensaje });
  
  const nuevoContacto = new Contacto({ nombre, email, mensaje });

  try {
    await nuevoContacto.save();
    console.log("Contacto saved successfully");

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "Nuevo mensaje de contacto desde tu sitio web",
      text: `Nombre: ${nombre}\nEmail: ${email}\nMensaje: ${mensaje}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error.message);
        console.error("Stack Trace:", error.stack);
        res.status(500).json({ message: "Error al enviar el mensaje" });
      } else {
        console.log("Email sent:", info.response);
        res.status(201).json({ message: "Mensaje enviado con éxito" });
      }
    });
  } catch (err) {
    console.error("Error saving contact:", err.message);
    console.error("Stack Trace:", err.stack);
    res.status(500).json({ message: "Error al enviar el mensaje" });
  }
});

app.get("/api/info", async (req, res) => {
  console.log("GET /api/info request received");
  try {
    const data = await Informacion.find({});
    console.log("Data fetched successfully:", data);
    res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching data:", err.message);
    console.error("Stack Trace:", err.stack);
    res.status(500).json({ message: "Error fetching data" });
  }
});

app.use(express.static(path.join(__dirname, '../dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.use((err, req, res, next) => {
  console.error("Server error:", err.message);
  console.error("Stack Trace:", err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
