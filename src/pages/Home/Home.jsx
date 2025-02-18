import { useState, useEffect } from "react";
import axios from "../../services/axios";
import { toast } from "react-toastify";

import "./style.css";
import Loading from "../../components/Loading/Loading";
import Table from "../../components/Table/Table";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [excelData, setExcelData] = useState([]);
  const [productivityData, setProductivityData] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState([]);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setCurrentDate([today]);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Buscar lista dearquivos
        const { data: dataFiles } = await axios.get("files/list");

        // Se houver arquivos, buscar dados do primeiro arquivo
        if (dataFiles.length > 0) {
          await fetchExcelData(dataFiles[0].filename);
        }

        // Buscar lista de usuários
        const { data: usersData } = await axios.get("/users");
        setUsers(usersData || []);
      } catch (error) {
        toast.error(`Erro ao carregar dados: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    const fetchExcelData = async (fileName) => {
      try {
        const { data: excelResponse } = await axios.get(`files/excel-data?file=${fileName}`);
        setExcelData(excelResponse);
      } catch (error) {
        console.error(`Erro ao buscar dados do Excel para ${fileName}:`, error);
        toast.error(`Erro ao carregar os dados para ${fileName}`);
      }
    };
    console.log("Usuário", users)

    fetchData();
  }, []);

  useEffect(() => {
    // Só chamar contarUsuarios quando excelData for atualizado
    if (excelData.length > 0) {
      const dadosProdutividade = contarUsuarios(excelData, currentDate);
      setProductivityData(dadosProdutividade);
      console.log(productivityData)
    }
  }, [excelData]);

  const contarUsuarios = (arquivos, dataFiltro) => {
    const contador = {};

    for (const arquivo of arquivos) {
      for (const item of arquivo.data) {
        let dataTratamento = item["DATA DE TRATAMENTO"];

        if (dataTratamento) {
          dataTratamento = dataTratamento.split(" ")[0]; // Pegando apenas YYYY-MM-DD
        }

        if (dataFiltro.includes(dataTratamento)) {
          const usuario = item["USUÁRIO QUE FEZ O TRATAMENTO"];
          contador[usuario] = (contador[usuario] || 0) + 1;
        }
      }
    }

    return contador;
  };



  if (loading) {
    return <Loading />;
  }

  // Criando um mapeamento de nome de usuário para o turno
  const usuariosTurnoTabela = users.reduce((acc, usuario) => {
    acc[usuario.name] = {
      shift: usuario.shift,
      channel: usuario.channel,
      entrada: usuario.shift.split("-")[1], // Pegando o horário de entrada (ex: "08:00")
    };
    return acc;
  }, {});

  const usuariosInfo = Object.keys(productivityData).reduce((acc, usuario) => {
    const now = new Date();
    const currentHour = now.getHours();
  
    const entrada = usuariosTurnoTabela[usuario]?.entrada || "00:00"; 
    const [horas, minutos] = entrada.split(":").map(Number);
    let horasTrabalhadas = currentHour - horas;
  
    if (horasTrabalhadas > 6) horasTrabalhadas = 6; // Limitando a 6h, como mencionado
  
    const channel = usuariosTurnoTabela[usuario]?.channel || "Desconhecido";
    
    let meta = 11.66; // Valor padrão
    if (channel === "Treinamento") {
      meta = 0;
    } else if (channel === "Meli Mensageria") {
      meta = 16.66;
    } else if (channel === "Meli Reclamação") {
      meta = 14.20;
    } else if (channel === "Meli Mediação") {
      meta = 14.20;
    }
  
    acc[usuario] = {
      produtividade: productivityData[usuario] || 0,
      turno: usuariosTurnoTabela[usuario]?.shift || "Desconhecido",
      channel: channel,
      meta: Math.floor(meta * horasTrabalhadas),
      porcentagem: ((productivityData[usuario] / (meta * horasTrabalhadas)) * 100).toFixed(0),
    };
  
    return acc;
  }, {});
  
  // Ordenando os usuários pela produtividade
  const usuariosOrdenados = Object.entries(usuariosInfo)
    .sort(([, a], [, b]) => b.produtividade - a.produtividade)
    .reduce((obj, [chave, valor]) => {
      obj[chave] = valor;
      
      return obj;
    }, {});

    const usuariosOrdenadosPorTurno = Object.fromEntries(
      Object.entries(usuariosOrdenados).sort(([, a], [, b]) => 
        a.turno.localeCompare(b.turno)
      )
    );

  
  return (
    <div>
      <h1 className="home-title">Produtividade por operador</h1>
      <Table {...usuariosOrdenadosPorTurno}></Table>
    </div>
  );
};

export default Home;
