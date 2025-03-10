import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import User from './src/models/userModel.js';

const createUser = async () => {
  try {
    // Gera um "sal" (salt) para a criptografia
    const salt = await bcrypt.genSalt(10); 

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash('10203040', salt); 

    // Cria o novo usuário com a senha criptografada
    const user = new User({
      email: 'test@empresa.com',
      password: hashedPassword,
    });

    // Conecta ao banco de dados
    await mongoose.connect('mongodb://localhost:27017/pet-registry', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Salva o usuário no banco de dados
    await user.save();
    console.log('Usuário criado com sucesso!');
  } catch (error) {
    console.error('Erro ao criar o usuário:', error);
  } finally {
    // Fechar a conexão com o banco de dados após a inserção
    mongoose.connection.close();
  }
};

createUser();