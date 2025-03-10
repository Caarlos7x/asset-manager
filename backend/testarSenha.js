import bcrypt from 'bcryptjs';

async function testarSenha() {
  const senhaDigitada = "123456";
  const senhaNoBanco = "$2b$10$stqPQe7x7/Hpv1JTyX5SLe8ZAumLuP4rM1g4/AxXH14brjah/PxeG"; // Copie do banco

  const match = await bcrypt.compare(senhaDigitada, senhaNoBanco);
  console.log("Senha correta?", match);
}

testarSenha();
