import { useState, useEffect } from 'react';
import axios from '../../services/axios';
import { toast } from 'react-toastify';
import './style.css';
import Loading from '../../components/Loading/Loading';
import Table from '../../components/Table/Table';

const Home = () => {
  const [usuariosOrdenados, setUsuariosOrdenados] = useState({});
  const [loading, setLoading] = useState(true);
  const [mediaTMAgeral, setMediaTMAgeral] = useState(0);
  const [somaProdutividade, setSomaProdutividade] = useState(0);
  const [atendimentosPorCanal, setAtendimentosPorCanal] = useState({});
  const [metaGeral, setMetaGeral] = useState(0);
  const [vaziosPorCanal, setVaziosPorCanal] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { data: usersData } = await axios.get('/users');
        const { data: dataFiles } = await axios.get('files/list');

        if (dataFiles.length > 0) {
          const { data: excelData } = await axios.get(
            `files/excel-data?file=${dataFiles[0].filename}`
          );

          const { data: produtividadeData } = await axios.post(
            '/api/produtividade',
            {
              excelData,
              users: usersData,
            }
          );

          setUsuariosOrdenados(produtividadeData.usuariosOrdenadosPorTurno);
          setMediaTMAgeral(produtividadeData.mediaTMAGeral);
          setSomaProdutividade(produtividadeData.totalAtendimentosGeral);
          setAtendimentosPorCanal(produtividadeData.atendimentosPorCanal);
          setMetaGeral(produtividadeData.metaTotalGeral);
          setVaziosPorCanal(produtividadeData.dataTratamentoVaziasPorCanal);
        }
      } catch (error) {
        toast.error(`Erro ao carregar dados: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const decimalToTime = decimal => {
    if (!decimal) return '00:00';
    const hours = Math.floor(decimal);
    const minutes = Math.round((decimal - hours) * 60);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  };

  const porcentagem =
    metaGeral > 0 ? ((somaProdutividade / metaGeral) * 100).toFixed(0) : '-';

  if (loading) return <Loading />;

  return (
    <div className="container">
      <h1 className="home-title">Relatório de Operação</h1>
      <div className="dashboard">
        <div className="card">
          <h2>Total de Atendimentos</h2>
          <p>{somaProdutividade}</p>
        </div>
        <div className="card">
          <h2>Média de TMA</h2>
          <p>{decimalToTime(mediaTMAgeral)} min</p>
        </div>
        <div className="card">
          <h2>Meta Geral</h2>
          <p>{metaGeral}</p>
        </div>
        <div className="card">
          <h2>Meta (%)</h2>
          <p>{porcentagem}%</p>
        </div>
      </div>

      <Table {...usuariosOrdenados} />

      <h2 className="table-title">Produtividade por canal do dia</h2>

      <table className="table-canais">
        <thead>
          <tr className="thead-color">
            {Object.keys(atendimentosPorCanal).map(canal => (
              <th key={canal}>{canal.slice(0, 10)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="table-row">
            {Object.values(atendimentosPorCanal).map((info, index) => (
              <td key={`atendimentos-${index}`} className="TableCell">
                {info.totalAtendimentos}
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      <h2 className="table-title">
        Pedidos pendentes para atuação baseado na última extração{' '}
      </h2>

      <table className="table-canais">
        <thead>
          <tr className="thead-color">
            {Object.keys(vaziosPorCanal).map(canal => (
              <th key={canal}>{canal.slice(0, 10)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="table-row">
            {Object.values(vaziosPorCanal).map((info, index) => (
              <td key={`vazios-${index}`} className="TableCell">
                {info}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Home;
