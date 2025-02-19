import { useState, useEffect } from "react";
import axios from "../../services/axios";
import { toast } from "react-toastify";
import "./style.css";
import Loading from "../../components/Loading/Loading";
import Table from "../../components/Table/Table";

const Home = () => {
  const [usuariosOrdenados, setUsuariosOrdenados] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Buscar lista de usuários
        const { data: usersData } = await axios.get("/users");

        // Buscar lista de arquivos
        const { data: dataFiles } = await axios.get("files/list");

        if (dataFiles.length > 0) {
          const { data: excelData } = await axios.get(`files/excel-data?file=${dataFiles[0].filename}`);
          
          // Enviar dados para o backend processar
          const { data: produtividadeData } = await axios.post("/api/produtividade", {
            excelData,
            users: usersData
          });

          setUsuariosOrdenados(produtividadeData);
        }
      } catch (error) {
        toast.error(`Erro ao carregar dados: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <h1 className="home-title">Produtividade por operador</h1>
      <Table {...usuariosOrdenados}></Table>
    </div>
  );
};

export default Home;
