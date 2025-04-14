const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Reemplazá esto con tu conexión real (asegurate de que tenga la contraseña correcta)
mongoose.connect('mongodb+srv://admin:admin@cluster0.ho6lh6g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('✅ Conectado a MongoDB');
    crearUsuarioPersonalizado();
  })
  .catch(err => console.error('❌ Error conectando a MongoDB:', err));

// Modelo de Usuario
const Usuario = require('./models/Usuario');

// Acá elegís los datos del nuevo usuario
const nuevoUsuario = {
  email: 'usuario@example.com',
  password: 'mi_contraseña_segura'
};

async function crearUsuarioPersonalizado() {
  try {
    const hashedPassword = await bcrypt.hash(nuevoUsuario.password, 10);
    const usuario = new Usuario({
      email: nuevoUsuario.email,
      password: hashedPassword
    });

    await usuario.save();
    console.log('🎉 Usuario creado con éxito');
    mongoose.disconnect();
  } catch (err) {
    console.error('❌ Error al crear el usuario:', err);
    mongoose.disconnect();
  }
}