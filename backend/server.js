const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const serveIndex = require('./serveIndex'); // Importar el middleware

dotenv.config();

const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://nicolas:yoko_eventos@cluster0.wu4uf2t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
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

app.get("/api/info", async (req, res) => {
  console.log("GET /api/info request received");
  try {
    const info = await Informacion.find();
    console.log("Info retrieved:", info);
    res.json(info);
  } catch (err) {
    console.error("Error retrieving info:", err);
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/contacto", async (req, res) => {
  const { nombre, email, mensaje } = req.body;
  const nuevoContacto = new Contacto({ nombre, email, mensaje });

  try {
    await nuevoContacto.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "Nuevo mensaje de contacto desde tu sitio web",
      text: `Nombre: ${nombre}\nEmail: ${email}\nMensaje: ${mensaje}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Error al enviar el mensaje" });
      } else {
        console.log("Email sent:", info.response);
        res.status(201).json({ message: "Mensaje enviado con éxito" });
      }
    });
  } catch (err) {
    console.error("Error saving contact:", err);
    res.status(500).json({ message: "Error al enviar el mensaje" });
  }
});

// Servir archivos estáticos desde `dist`
app.use('/static', express.static(path.join(__dirname, 'dist')));

// Usar el middleware para servir index.html
app.use(serveIndex);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
