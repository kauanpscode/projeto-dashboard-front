import { useState, useEffect } from "react";
import axios from "../../services/axios";
import { toast } from "react-toastify";

import "./style.css";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import Loading from "../../components/Loading/Loading";

const Arquivos = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState(null);


  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get("files/list"); // Requisição à API
        setFiles(response.data); // Atualiza o estado com os arquivos
      } catch (error) {
        console.error("Erro ao buscar arquivos:", error);
        toast.error("Erro ao carregar arquivos.");
      } finally {
        setLoading(false); // Atualiza o estado de loading
      }
    };

    fetchFiles(); // Chama a função de busca
  }, []);

  const handleOpenModal = (id) => {
    setSelectedFileId(id);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDeleteConfirmed = async () => {
    try {
      await axios.delete(`/files/delete/${selectedFileId}`);
      setFiles(files.filter((file) => file.id !== selectedFileId));
      toast.success("Arquivo excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir o arquivo:", error);
      toast.error("Erro ao excluir o arquivo.");
    }
    setOpenModal(false);
  };

  return (
    <div className="files-container">
      <h1 className="files-title">Lista de Arquivos</h1>
      {loading ? (
        <Loading />
      ) : files.length > 0 ? (
        <table className="files-table">
          <thead>
            <tr>
              <th>Arquivo</th>
              <th>Canal</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr key={file.id}>
                <td>{file.originalName}</td>
                <td>{file.channel_slug}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleOpenModal(file.id)}>
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="files-empty">Nenhum arquivo encontrado.</p>
      )}

      <ConfirmModal
        open={openModal}
        onClose={handleCloseModal}
        onConfirm={handleDeleteConfirmed}
        title="Tem certeza que deseja excluir este arquivo?"
      />
    </div>
  );
};

export default Arquivos;