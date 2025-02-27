import { useState, useEffect } from "react";
import axios from "../../services/axios";
import { toast } from "react-toastify";
import "./style.css";
import Loading from "../../components/Loading/Loading";
import Table from "../../components/Table/Table";

const Home = () => {
  const [usuariosOrdenados, setUsuariosOrdenados] = useState({});
  const [loading, setLoading] = useState(true);
  const [mediaTMAgeral, setMediaTMAgeral] = useState(0);
  const [somaProdutividade, setSomaProdutividade] = useState(0);

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
          const { data: produtividadeData} = await axios.post("/api/produtividade", {
            excelData,
            users: usersData,
          });

          setUsuariosOrdenados(produtividadeData.usuariosOrdenadosPorTurno);
          setMediaTMAgeral(produtividadeData.mediaTMAGeral);
          setSomaProdutividade(produtividadeData.totalAtendimentosGeral);
        }
      } catch (error) {
        toast.error(`Erro ao carregar dados: ${error}`);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  function decimalToTime(decimal) {
    const hours = Math.floor(decimal);
    const minutes = Math.round((decimal - hours) * 60);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <h1 className="home-title">Relatório Operação</h1>
      <div className="dashboard">
        <div className="card">
          <h2>Média de TMA</h2>
          <p>{decimalToTime(mediaTMAgeral)} min</p>
        </div>
        <div className="card">
          <h2>Total de Atendimentos</h2>
          <p>{somaProdutividade}</p>
        </div>
      </div>
      <Table {...usuariosOrdenados} />
    </div>
  );
};

export default Home;
