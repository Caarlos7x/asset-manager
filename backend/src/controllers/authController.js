import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log('Email recebido:', email);
  console.log('Senha recebida:', password);

  try {
    // Verifica se o usuário existe
    const user = await User.findOne({ email });
    console.log('Usuário encontrado no banco:', user);

    if (!user) {
      console.log('Usuário não encontrado');
      return res.status(400).json({ message: 'User not found' });
    }

    console.log("Comparando senha com hash...");
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Resultado da comparação:', isMatch);

    if (!isMatch) {
      console.log('Senha inválida');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Gera o token JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log("Login bem-sucedido! Token gerado.");
    res.json({ token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export { loginUser };