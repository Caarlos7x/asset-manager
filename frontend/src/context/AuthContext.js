import { createContext, useContext, useState, useEffect } from 'react';

// Criar o contexto de autenticação
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Verifica se o usuário já está logado no LocalStorage ao carregar a página
  useEffect(() => {
    const loggedUser = localStorage.getItem('user');
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
  }, []);

// Função para login
const login = (email, password) => {
  // Simulação de login (substitua pela API real)
  console.log("Tentando login com", email, password); // Adicione um log para depuração

  if (email === "admin@empresa.com" && password === "123456") {
    const userData = { email };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    return true; // Login bem-sucedido
  }

  console.log("Credenciais inválidas!"); // Log para verificar a falha
  return false; // Falha no login
};


  // Função para logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para acessar o contexto
export const useAuth = () => useContext(AuthContext);