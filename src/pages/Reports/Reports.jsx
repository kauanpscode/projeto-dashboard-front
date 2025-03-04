import { useState } from "react";
import axios from "../../services/axios";
import "./style.css";
import { toast } from "react-toastify";

const Reports = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [channelSlug, setChannelSlug] = useState("")
  
  const channelSlugs = [
    { label : "Magazine Luiza", value: "MagazineLuiza"},
    { label : "Americanas", value: "B2W"},
    { label : "Carrefour", value: "Carrefour"},
    { label : "Via Varejo", value: "Cnova"},
    { label : "OCP", value: "OCP"},
    { label : "Amazon", value: "Amazon"},
    { label : "MadeiraMadeira Mensageria", value: "MadeiraMSG"},
    { label : "MadeiraMadeira SAC", value: "Madeira SAC"},
    { label : "Mercado Livre Mensageria", value: "MeliMensageria"},
    { label : "Mercado Livre Reclamação", value: "MeliReclamacao"},
    { label : "Mercado Livre Mediação", value: "MeliMediacao"},
    { label : "Novo Acompanhamento", value: "NovoAcompanhamento"},
    { label : "Novo Acompanhamento Fulltime", value: "NovoAcompanhamentoFulltime"},
    { label : "Indisponíveis", value: "Indisponivel"},
    { label : "Acompanhamento Meli", value: "MeliAcompanhamento"},
    { label : "Demandas Extras", value: "DemandasExtras"},
  ]

  const handleFileChange = (e) => {
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

        <input
          type="file"
          accept=".xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          onChange={handleFileChange}
        />

        <button type="submit">Enviar Arquivo</button>
      </form>
    </div>
    </>
  );
};

export default Reports;
