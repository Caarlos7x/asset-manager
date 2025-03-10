import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Definição do esquema do usuário
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'O e-mail é obrigatório'],
    unique: true,  // Garantir que o e-mail seja único
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'A senha é obrigatória'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

// Criptografar a senha antes de salvar o usuário
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  // Criptografar a senha
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Método para verificar a senha
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;