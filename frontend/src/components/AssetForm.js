import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api/api';
import Button from './buttons/Button';
import './styles/AssetForm.css';

const AssetForm = ({ onAddAsset }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const [formData, setFormData] = useState({
    hostname: '',
    tag: '',
    lastUserLogon: '',
    domain: '',
    manufacturer: '',
    model: '',
    serialNumber: '',
    os: ''
  });

  const formFields = [
    { id: "hostname", label: "Hostname" },
    { id: "tag", label: "Tag" },
    { id: "lastUserLogon", label: "Último usuário logado" },
    { id: "domain", label: "Domínio" },
    { id: "manufacturer", label: "Fabricante" },
    { id: "model", label: "Modelo" },
    { id: "serialNumber", label: "Número de série" },
    { id: "os", label: "Sistema Operacional" }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert({ type: "", message: "" });

    try {
      console.log('Enviando ativo para API:', formData);
      const res = await api.post('/assets', formData);
      console.log('Resposta da API:', res.data);

      onAddAsset(res.data);
      setFormData({
        hostname: '',
        tag: '',
        lastUserLogon: '',
        domain: '',
        manufacturer: '',
        model: '',
        serialNumber: '',
        os: ''
      });

      setAlert({ type: "success", message: "Ativo cadastrado com sucesso!" });
      setTimeout(() => navigate("/registrar"), 2000);
    } catch (err) {
      console.error('Erro ao adicionar um ativo:', err.response?.data || err.message);
      setAlert({ type: "error", message: "Erro ao cadastrar o ativo. Tente novamente." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="asset-form">
      {alert.message && (
        <div className={`alert ${alert.type === "success" ? "alert-success" : "alert-error"}`}>
          {alert.message}
        </div>
      )}

      {formFields.map(({ id, label }) => (
        <input
          key={id}
          type="text"
          id={id}
          placeholder={label}
          value={formData[id]}
          onChange={handleChange}
          required
        />
      ))}

      <Button
        text={loading ? 'Cadastrando...' : 'Cadastrar ativo'}
        className="btn-add"
        type="submit"
        disabled={loading}
      />

      {loading && <div className="spinner"></div>}
    </form>
  );
};

export default AssetForm;
