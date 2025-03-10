import React, { useState } from 'react';
import { saveToken } from '../utils/auth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importe o hook useNavigate

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate(); // Inicializa o hook de navegação

  const handleLogin = async (e) => {
    e.preventDefault();
  
    // Log para verificar os dados que estão sendo enviados
    console.log({ email, password });
  
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });
  
      saveToken(response.data.token);
  
      // Redireciona para a página de AssetList após login bem-sucedido
      navigate('/editar');
    } catch (err) {
      setError('Credenciais inválidas');
      console.error("Erro ao fazer login:", err.response || err.message); // Adicionando log para verificar o erro detalhado
    }
  };
  

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;