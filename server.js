const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Usuario = require('./models/Usuario');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());


mongoose.connect('mongodb+srv://admin:admin@cluster0.ho6lh6g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Conectado a MongoDB Atlas'))
.catch((err) => console.error('❌ Error conectando a MongoDB:', err));

// Ruta para login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.json({ success: false, mensaje: 'Correo incorrecto' });
    }

    const esValido = await bcrypt.compare(password, usuario.password);
    if (esValido) {
      res.json({ success: true });
    } else {
      res.json({ success: false, mensaje: 'Contraseña incorrecta' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, mensaje: 'Error del servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
