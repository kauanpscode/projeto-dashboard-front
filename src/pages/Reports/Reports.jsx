import { useState } from "react";
import axios from "../../services/axios";
import "./style.css";
import { toast } from "react-toastify";

const Reports = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [channelSlug, setChannelSlug] = useState("")
  
  const channelSlugs = [
    { label : "Magazine Luiza", value: "magazineluiza"},
    { label : "Americanas", value: "b2w"},
    { label : "Carrefour", value: "carrefour"},
    { label : "Via Varejo", value: "cnova"},
    { label : "OCP", value: "vtex_bancointer"},
    { label : "Amazon", value: "amazon"},
    { label : "MadeiraMadeira Mensageria", value: "madeiramadeiramsg"},
    { label : "MadeiraMadeira SAC", value: "madeiramadeirasac"},
    { label : "Mercado Livre Mensageria", value: "mercadolivremsg"},
    { label : "Mercado Livre Reclamação", value: "mercadolivrerec"},
    { label : "Mercado Livre Mediação", value: "mercadolivremed"},
    { label : "Novo Acompanhamento", value: "novoAcompanhamento"},
    { label : "Novo Acompanhamento Fulltime", value: "novoAcompanhamentoFulltime"},
    { label : "Demandas Extras", value: "demandasExtras"},
  ]

  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    setSelectedFile(e.target.files[0])
  }


  const handleSlugChange = (e) => {
    setChannelSlug(e.target.value)
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    

    if(!selectedFile) {
      toast.error("Por favor, selecione um arquivo!");
      return;
    }

    if(!channelSlug) {
      toast.error("Por favor, selecione um canal!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile)
    formData.append("channel_slug", channelSlug);

    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    try {
      const response = await axios.post("/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(response.data.message);
    } catch (error) {
      if (error.response) {
        toast.error(`Erro: ${error.response.data.error}`);
      } else if (error.request) {
        toast.error("Erro de rede, por favor tente novamente.");
      } else {
        toast.error("Ocorreu um erro inesperado.");
      }
    }
  };

  return (
    <>
      <h1 className="reports-title">Upload de arquivos</h1>
    <div className="file-upload-form">
      <form onSubmit={handleSubmit}>
        <select
          value={channelSlug}
          onChange={handleSlugChange}
        >
          <option value="" disabled>
            Selecione um canal
          </option>
          {channelSlugs.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>

        <input type="file" onChange={handleFileChange} />

        <button type="submit">Enviar Arquivo</button>
      </form>
    </div>
    </>
  );
};

export default Reports;
