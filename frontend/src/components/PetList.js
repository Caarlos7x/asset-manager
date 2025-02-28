import { useState, useEffect } from 'react';
import api from './api/api';
import './styles/PetList.css';

const PetList = ({ onRemovePet }) => {
  const [pets, setPets] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  const fetchPets = async () => {
    try {
      const response = await api.get('/pets');
      setPets(response.data);
    } catch (err) {
      console.error('Erro ao buscar os pets:', err);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const handleRemove = async (id) => {
    setLoadingId(id);
    await onRemovePet(id);
    setLoadingId(null);
    fetchPets();
  };

  return (
    <div className="pet-list-container">
      <h2>Lista de Pets</h2>
      {pets.length === 0 ? (
        <p>Nenhum pet cadastrado.</p>
      ) : (
        <table className="pet-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Espécie</th>
              <th>Idade</th>
              <th>Proprietário</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pets.map((pet) => (
              <tr key={pet._id}>
                <td>{pet.name}</td>
                <td>{pet.species}</td>
                <td>{pet.age} anos</td>
                <td>{pet.owner}</td>
                <td>
                  <button
                    onClick={() => handleRemove(pet._id)}
                    disabled={loadingId === pet._id}
                    className="remove-btn"
                  >
                    {loadingId === pet._id ? 'Removendo...' : '❌ Remover'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PetList;
