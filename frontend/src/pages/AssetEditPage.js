import { useState, useEffect } from "react";
import api from "../components/api/api";
import AssetList from "../components/AssetList";

const AssetListPage = () => {
  const [assets, setAssets] = useState([]);

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

  return <AssetList assets={assets} />;
};

export default AssetListPage;