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
  const [atendimentosPorCanal, setAtendimentosPorCanal] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const { data: usersData } = await axios.get("/users");
        const { data: dataFiles } = await axios.get("files/list");

        if (dataFiles.length > 0) {
          const { data: excelData } = await axios.get(`files/excel-data?file=${dataFiles[0].filename}`);
          
          const { data: produtividadeData } = await axios.post("/api/produtividade", {
            excelData,
            users: usersData,
          });
          
          setUsuariosOrdenados(produtividadeData.usuariosOrdenadosPorTurno);
          setMediaTMAgeral(produtividadeData.mediaTMAGeral);
          setSomaProdutividade(produtividadeData.totalAtendimentosGeral);
          setAtendimentosPorCanal(produtividadeData.atendimentosPorCanal);
        }
      } catch (error) {
        toast.error(`Erro ao carregar dados: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const decimalToTime = (decimal) => {
    if (!decimal) return "00:00";
    const hours = Math.floor(decimal);
    const minutes = Math.round((decimal - hours) * 60);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  };

  if (loading) return <Loading />;

  return (
    <div className="container">
      <h1 className="home-title">Relatório de Operação</h1>
      <Table {...usuariosOrdenados} />
      <div className="dashboard">
        {Object.entries(atendimentosPorCanal).map(([canal, info]) => (
          <div className="card-canal" key={canal}>
            <h2>{canal}</h2>
            <p><strong className="black-font">Atendimentos:</strong> {info.totalAtendimentos}</p>
            <p><strong className="black-font">TMA:</strong> {decimalToTime(info.totalTempo / info.totalAtendimentos)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;