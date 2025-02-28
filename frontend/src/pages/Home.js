import React, { useState, useEffect } from 'react';
import { IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonRow, IonCol, IonSearchbar } from '@ionic/react';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ScrollToTopButton from '../components/buttons/ScrollToTopButton';
import '../components/styles/HomePage.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Home = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [mockAssets] = useState([
    { id: 1, name: 'Laptop Dell XPS 15', category: 'Hardware', status: true, lastUpdated: '2025-02-22T08:30:00', warrantyStatus: true },
    { id: 2, name: 'Software Windows 10', category: 'Software', status: false, lastUpdated: '2025-02-20T10:00:00', warrantyStatus: false },
    { id: 3, name: 'Servidor HP ProLiant', category: 'Hardware', status: true, lastUpdated: '2025-02-18T14:30:00', warrantyStatus: true },
    { id: 4, name: 'Licença Adobe Photoshop', category: 'Software', status: true, lastUpdated: '2025-02-19T11:00:00', warrantyStatus: true },
    { id: 5, name: 'Switch Cisco 2960', category: 'Networking', status: true, lastUpdated: '2025-02-17T16:45:00', warrantyStatus: true }
  ]);
  
  const [searchTerm, setSearchTerm] = useState(""); // Estado para armazenar o valor da busca
  
  const handleScroll = () => setShowScrollButton(window.scrollY > 300);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredAssets = mockAssets.filter(asset => 
    asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.category.toLowerCase().includes(searchTerm.toLowerCase())
  ); // Filtrando os ativos com base no termo de busca

  const assetData = {
    labels: ['Hardware', 'Software', 'Networking', 'Peripherals'],
    datasets: [{
      data: [60, 30, 10, 0],
      backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0'],
      hoverBackgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0']
    }]
  };

  const statusData = {
    labels: ['Ativos', 'Inativos'],
    datasets: [{
      label: 'Distribuição de Status',
      data: [mockAssets.filter(asset => asset.status).length, mockAssets.filter(asset => !asset.status).length],
      backgroundColor: ['#36a2eb', '#ff6384'],
      borderColor: ['#36a2eb', '#ff6384'],
      borderWidth: 1
    }]
  };

  const doughnutOptions = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 10,
          boxHeight: 10,
          padding: 20,
          font: { size: 14 }
        }
      }
    }
  };

  const barOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: { display: false }
    }
  };

  const recentAssets = filteredAssets.slice(0, 5); // Limita aos 5 primeiros ativos filtrados
  const formatDate = (date) => new Date(date).toLocaleDateString();

  return (
    <IonPage>
      <IonHeader className="homePage-header">
        <IonToolbar className="homePage-toolbar">
          <IonTitle className="homePage-title">Dashboard - Inventário de Ativos de TI</IonTitle>
        </IonToolbar>
      </IonHeader>

      {/* Seção de Visão Geral */}
      <section id="overview" className="overview">
        <IonRow>
          <IonCol size="12" sizeMd="6">
            <IonCard>
              <IonCardHeader>
                <h1>Total de Ativos</h1>
              </IonCardHeader>
              <IonCardContent>
                <p>Total de ativos: <strong>{mockAssets.length}</strong></p>
                <div style={{ width: '100%', height: '300px' }}>
                  <Doughnut data={assetData} options={doughnutOptions} />
                </div>
              </IonCardContent>
            </IonCard>
          </IonCol>

          <IonCol size="12" sizeMd="6">
            <IonCard>
              <IonCardHeader>
                <h1>Distribuição de Status</h1>
              </IonCardHeader>
              <IonCardContent>
                <div style={{ width: '100%', height: '300px' }}>
                  <Bar data={statusData} options={barOptions} />
                </div>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      </section>

      {/* Seção de Alertas e Manutenção */}
      <section id="alerts-maintenance">
        <IonRow>
          <IonCol size="12" sizeMd="6">
            <IonCard>
              <IonCardHeader>
                <h1>Alertas de Segurança</h1>
              </IonCardHeader>
              <IonCardContent>
                <p>Licença de software <strong>expirada</strong> em <strong>10</strong> dias!</p>
                <p><strong>Manutenção agendada</strong>: Servidores no próximo sábado.</p>
              </IonCardContent>
            </IonCard>
          </IonCol>

          <IonCol size="12" sizeMd="6">
            <IonCard>
              <IonCardHeader>
                <h1>Máquinas Fora da Garantia</h1>
              </IonCardHeader>
              <IonCardContent>
                <div className="warrantyAssets">
                  <p><strong>Máquina</strong>: <strong>NB45002-BR</strong> <span>Fora da garantia</span> desde 2025-02-10</p>
                  <p><strong>Máquina</strong>: <strong>NB37001-BR</strong> <span>Fora da garantia</span> desde 2025-01-25</p>
                </div>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      </section>

      {/* Seção de Lista de Ativos */}
      <section id="assets-list">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <div className="currentAssets">
                <h3>Ativos Recentes</h3>
              </div>
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonSearchbar
              debounce={300}
              placeholder="Buscar Ativos"
              className="custom-searchbar"
              searchIcon="search"
              slot="end"
              value={searchTerm} // Atribuindo o valor de busca ao IonSearchbar
              onIonInput={(e) => setSearchTerm(e.target.value)} // Atualiza o termo de busca
            />
            <table className="asset-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Categoria</th>
                  <th>Status</th>
                  <th>Última Atualização</th>
                </tr>
              </thead>
              <tbody>
                {recentAssets.map(asset => (
                  <tr key={asset.id} style={{ backgroundColor: !asset.warrantyStatus ? 'lightcoral' : 'inherit' }}>
                    <td>{asset.name}</td>
                    <td>{asset.category}</td>
                    <td>{asset.status ? 'Ativo' : 'Inativo'}</td>
                    <td>{formatDate(asset.lastUpdated)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </IonCardContent>
        </IonCard>
      </section>

      {/* Botão para rolar para o topo */}
      {showScrollButton && <ScrollToTopButton />}
    </IonPage>
  );
};

export default Home;
