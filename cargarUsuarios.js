const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Usuario = require('./models/Usuario');

mongoose.connect('mongodb+srv://admin:admin@cluster0.ho6lh6g.mongodb.net/examen-nutri?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  console.log('Conectado. Cargando usuarios...');

  const hashedPassword = await bcrypt.hash('123456', 10);
  
  await Usuario.create({ email: 'test@correo.com', password: hashedPassword });

  console.log('Usuario creado!');
  mongoose.disconnect();
}).catch(err => {
  console.error('Error:', err);
});