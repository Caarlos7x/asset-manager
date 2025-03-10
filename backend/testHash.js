import bcrypt from 'bcryptjs';

async function gerarHash() {
  const senha = '123456';
  const saltRounds = 10;

  try {
    const hash = await bcrypt.hash(senha, saltRounds);
    console.log('Senha hash:', hash);
  } catch (err) {
    console.error('Erro ao gerar hash:', err);
  }
}

gerarHash();
