import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AssetForm from './components/AssetForm';
import PetEditPage from "./pages/AssetEditPage";
import Home from './pages/Home';
import api from './components/api/api';
import './components/styles/App.css';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';

function App() {
  const [assets, setAssets] = useState([]);

  // Carregar ativos ao iniciar
  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const res = await api.get('/assets');
      setAssets(res.data);
    } catch (err) {
      console.error('Erro ao buscar os ativos:', err);
    }
  };

  // Adicionar novo ativo e atualizar lista
  const addAsset = async (newAsset) => {
    try {
      const res = await api.post('/assets', newAsset);
      setAssets([...assets, res.data]);
    } catch (err) {
      console.error('Erro ao adicionar um ativo:', err);
    }
  };

  // Remover ativo da lista
  const removeAsset = async (id) => {
    try {
      await api.delete(`/assets/${id}`);
      setAssets(assets.filter((asset) => asset._id !== id));
    } catch (err) {
      console.error('Erro ao remover um ativo:', err);
    }
  };

  return (
    <Router>
      <div className="container">
        {/* Navbar */}
        <nav className="topbar">
          <ul>
            <li><Link to="/home">🏠 Home</Link></li>
            <li><Link to="/registrar">➕ Cadastrar Ativo</Link></li>
            <li><Link to="/editar/:id">✏️ Editar Cadastro</Link></li>
            <li><Link to="/dashboard">📊 Dashboard</Link></li>
          </ul>
        </nav>

        {/* Rotas */}
        <Routes>
          <Route path="/home" element={<Home pets={assets} onRemovePet={removeAsset} />} />
          <Route path="/registrar" element={<AssetForm onAddAsset={addAsset} />} />
          <Route path="/editar/:id" element={<PetEditPage />} />
          
          {/* Debugging log: Verificando se a rota está sendo chamada */}
          <Route 
            path="/dashboard" 
            element={
              <>
                <h1>Página de Dashboard</h1>
                <Dashboard />
              </>
            } 
          />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
