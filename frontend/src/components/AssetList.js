import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/buttons/Button';
import InputField from '../components/InputField';
import api from "../components/api/api";
import './styles/AssetList.css';

const getToken = () => localStorage.getItem('token');

const AssetList = () => {
  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assetToEdit, setAssetToEdit] = useState({});
  const [sortOrder, setSortOrder] = useState('asc');
  const [osFilter, setOsFilter] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchAssets = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const res = await api.get("/assets", config);
        setAssets(res.data);
      } catch (err) {
        console.error("Erro ao buscar ativos:", err);
      }
    };

    fetchAssets();
  }, [navigate]);

  const handleEdit = (asset) => {
    setIsModalOpen(true);
    setAssetToEdit(asset);
  };

  const handleDelete = async (id) => {
    try {
      const token = getToken();
      if (!token) {
        alert("Você precisa estar autenticado para excluir um ativo.");
        return;
      }

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      await api.delete(`/assets/${id}`, config);
      setAssets((prevAssets) => prevAssets.filter((asset) => asset._id !== id));
      alert("Ativo excluído com sucesso!");
    } catch (err) {
      console.error("Erro ao excluir o ativo:", err);
    }
  };

  // Filtro e ordenação dos ativos
  const filteredAssets = assets
    .filter(asset => 
      (asset.hostname.toLowerCase().includes(search.toLowerCase()) || 
      asset.tag.toLowerCase().includes(search.toLowerCase())) &&
      (osFilter === '' || asset.os === osFilter)
    )
    .sort((a, b) => {
      if (sortOrder === 'asc') return a.hostname.localeCompare(b.hostname);
      return b.hostname.localeCompare(a.hostname);
    });

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setAssetToEdit((prev) => ({ ...prev, [name]: value }));
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getToken();
      if (!token) {
        alert("Você precisa estar autenticado para editar um ativo.");
        return;
      }

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      await api.put(`/assets/${assetToEdit._id}`, assetToEdit, config);
      setAssets((prevAssets) =>
        prevAssets.map((asset) => (asset._id === assetToEdit._id ? assetToEdit : asset))
      );
      setIsModalOpen(false);
      alert("Ativo atualizado com sucesso!");
    } catch (err) {
      console.error("Erro ao editar o ativo:", err);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setAssetToEdit({});
  };

  const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

  return (
    <div className="asset-list">
      <h2>Ativos cadastrados</h2>

      {/* Barra de pesquisa */}
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Buscar por Hostname ou Tag"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <i className="fa fa-search"></i>
      </div>

      {/* Filtros de Sistema Operacional */}
      <div className="filters">
        <label>Filtrar por SO:</label>
        <select onChange={(e) => setOsFilter(e.target.value)} value={osFilter}>
          <option value="">Todos</option>
          <option value="Windows">Windows</option>
          <option value="MacOS">MacOS</option>
        </select>

        {/* Filtro de Ordenação */}
        <label>Ordenar por Hostname:</label>
        <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
          <option value="asc">A - Z</option>
          <option value="desc">Z - A</option>
        </select>
      </div>

      {/* Tabela de Ativos */}
      <table className="asset-table">
        <thead>
          <tr>
            {['Hostname', 'Tag', 'Último usuário logado', 'Domínio', 'Fabricante', 'Modelo', 'SO', 'Ação'].map((header, index) => (
              <th key={index} className="bold-header">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredAssets.map((asset) => (
            <tr key={asset._id}>
              {['hostname', 'tag', 'lastUserLogon', 'domain', 'manufacturer', 'model', 'os'].map((key) => (
                <td key={key}>{asset[key]}</td>
              ))}
              <td className='buttons'>
                <Button text="Editar" className="btn-edit" onClick={() => handleEdit(asset)} />
                <Button text="Excluir" className="btn-delete" onClick={() => handleDelete(asset._id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de Edição */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Editar Ativo</h2>
            <form onSubmit={handleModalSubmit}>
              {['hostname', 'tag', 'lastUserLogon', 'domain', 'manufacturer', 'model', 'os'].map((field) => (
                <InputField
                  key={field}
                  label={capitalize(field)}
                  name={field}
                  value={assetToEdit[field] || ''}
                  onChange={handleModalChange}
                />
              ))}
              <div className="modal-actions">
                <Button text="Salvar Alterações" className="btn-save" type="submit" />
                <Button text="Cancelar" className="btn-cancel" type="button" onClick={closeModal} />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetList;