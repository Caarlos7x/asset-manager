import React, { useState, useEffect } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCol, IonRow } from '@ionic/react';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import api from '../components/api/api';
import '../components/styles/Dashboard.css';
import * as XLSX from 'xlsx';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [osData, setOsData] = useState({ labels: [], datasets: [] });
  const [machineData, setMachineData] = useState({ labels: [], datasets: [] });
  const [departmentData, setDepartmentData] = useState({ labels: [], datasets: [] });
  const [recentAssets, setRecentAssets] = useState([]);

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const res = await api.get('/assets');
      const { windows, macos, inUse, available, departmentCount } = countAssets(res.data);

      setOsData({
        labels: ['Windows', 'MacOS'],
        datasets: [{
          data: [windows, macos],
          backgroundColor: ['#36A2EB', '#FF6384'],
        }],
      });

      setMachineData({
        labels: ['Em Uso', 'Disponível'],
        datasets: [{
          data: [inUse, available],
          backgroundColor: ['#FFCE56', '#FF5733'],
        }],
      });

      setDepartmentData({
        labels: Object.keys(departmentCount),
        datasets: [{
          label: 'Ativos por Departamento',
          data: Object.values(departmentCount),
          backgroundColor: ['#4CAF50', '#FFC107', '#FF5733', '#36A2EB'],
        }],
      });

      setRecentAssets(res.data.slice(-5));
    } catch (err) {
      console.error('Erro ao buscar os ativos:', err);
    } finally {
      setLoading(false);
    }
  };

  const countAssets = (assets) => {
    let windows = 0, macos = 0, inUse = 0, available = 0;
    let departmentCount = {};

    assets.forEach((asset) => {
      if (asset.os === 'Windows') windows++;
      if (asset.os === 'MacOS') macos++;
      if (asset.lastUserLogon) inUse++;
      else available++;

      departmentCount[asset.department] = (departmentCount[asset.department] || 0) + 1;
    });

    return { windows, macos, inUse, available, departmentCount };
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(recentAssets);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Relatório Ativos");
    XLSX.writeFile(wb, "Relatorio_Ativos.xlsx");
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 10,
          boxHeight: 10,
          font: {
            size: 15,
          },
          padding: 15,
        },
      },
    },
    elements: {
      arc: {
        borderWidth: 1,
      },
    },
  };

  return (
    <IonRow>
      <IonCol size="12" size-md="6">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <div className="displayTitle-dash">
                <h1>Sistema Operacional</h1>
              </div>
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            {loading ? <p>Carregando...</p> :
              <div style={{ width: '100%', height: '400px' }}>
                <Doughnut className="chart" data={osData} options={chartOptions} />
              </div>
            }
          </IonCardContent>
        </IonCard>
      </IonCol>

      <IonCol size="12" size-md="6">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <div className="displayTitle-dash">
                <h1>Status das Máquinas</h1>
              </div>
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            {loading ? <p>Carregando...</p> :
              <div style={{ width: '100%', height: '400px' }}>
                <Doughnut className="chart" data={machineData} options={chartOptions} />
              </div>
            }
          </IonCardContent>
        </IonCard>
      </IonCol>

      <IonCol size="12">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <div className="assetDepartment">
                <h1>Ativos por Departamento</h1>
              </div>
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            {loading ? <p>Carregando...</p> : 
              <Bar className="chart" data={departmentData} options={chartOptions} />
            }
          </IonCardContent>
        </IonCard>
      </IonCol>

      <IonCol size="12">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <div className="lasteRegisterAsset">
                <h1>Últimos Ativos Cadastrados</h1>
              </div>
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <div className="assetsRegisterList">
              <ul>
                {recentAssets.map(asset => (
                  <li key={asset._id}>{asset.hostname} - {asset.os} - <span>{asset.lastUserLogon}</span></li>
                ))}
              </ul>
            </div>

            <div className="btn-download-report">
              <button className="custom-btn" onClick={exportToExcel}>Baixar Relatório</button>
            </div>

          </IonCardContent>
        </IonCard>
      </IonCol>
    </IonRow>
  );
};

export default Dashboard;