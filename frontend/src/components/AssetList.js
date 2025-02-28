import React, { useState, useEffect } from 'react';
import Button from '../components/buttons/Button';
import InputField from '../components/InputField';
import api from "../components/api/api";
import './styles/AssetList.css';

const AssetList = () => {
  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assetToEdit, setAssetToEdit] = useState({});
  const [sortOrder, setSortOrder] = useState('asc');
  const [osFilter, setOsFilter] = useState('');

  // Buscar todos os ativos ao carregar a página
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const res = await api.get("/assets");
        setAssets(res.data);
      } catch (err) {
        console.error("Erro ao buscar ativos:", err);
      }
    };
    fetchAssets();
  }, []);

  // Filtrar os ativos com base na busca por tag ou ID
  const filteredAssets = assets
    .filter((asset) =>
      asset.hostname.toLowerCase().includes(search.toLowerCase()) ||
      asset.tag.toLowerCase().includes(search.toLowerCase()) ||
      asset.lastUserLogon.toLowerCase().includes(search.toLowerCase()) ||
      asset._id.includes(search) ||
      (osFilter && asset.os.toLowerCase() === osFilter.toLowerCase())
    )
    .sort((a, b) => {
      // Ordena com base no sistema operacional (caso deseje ordenar por outro campo, basta trocar)
      if (sortOrder === 'asc') {
        return a.hostname.localeCompare(b.hostname);
      } else {
        return b.hostname.localeCompare(a.hostname);
      }
    });

  const handleEdit = (asset) => {
    setIsModalOpen(true);
    setAssetToEdit(asset);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/assets/${id}`);
      setAssets(assets.filter((asset) => asset._id !== id));
      alert("Ativo excluído com sucesso!");
    } catch (err) {
      console.error("Erro ao excluir o ativo:", err);
    }
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    if (!assetToEdit._id) return alert("Ativo inválido!");
    try {
      await api.put(`/assets/${assetToEdit._id}`, assetToEdit);
      alert("Ativo atualizado com sucesso!");
      setIsModalOpen(false);
      setAssets(assets.map((asset) => (asset._id === assetToEdit._id ? assetToEdit : asset)));
    } catch (err) {
      console.error("Erro ao atualizar o ativo:", err);
    }
  };

  const handleModalChange = (e) => {
    setAssetToEdit((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const closeModal = () => setIsModalOpen(false);

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

// Função auxiliar para capitalizar as palavras
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).replace(/([A-Z])/g, ' $1');

export default AssetList;