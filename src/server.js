import mongoose from 'mongoose';
import config from './config/config.js';
import app from './app.js';

mongoose
  .connect(config.db.uri, config.db.options)
  .then(() => {
    console.log('MongoDB conectado com sucesso');
    app.listen(config.port, () => {
      console.log(`Servidor rodando na porta ${config.port}`);
    });
  })
  .catch((err) => {
    console.error('Erro ao conectar no MongoDB:', err);
  });