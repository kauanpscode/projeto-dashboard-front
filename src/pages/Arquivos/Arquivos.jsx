import { useState, useEffect } from 'react';
import axios from '../../services/axios';
import { toast } from 'react-toastify';
import { FaThumbtack } from 'react-icons/fa';

import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import Loading from '../../components/Loading/Loading';
import './style.css';

const Arquivos = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get('files/list');
        setFiles(response.data);
        setFiles(response.data.sort((b, a) => b.fixed - a.fixed));
      } catch (error) {
        toast.error('Erro ao carregar arquivos.');
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  useEffect(() => {
    if (files.length === 0) return;

    const nameCount = {};
    const duplicates = [];

    files.forEach(file => {
      nameCount[file.originalName] = (nameCount[file.originalName] || 0) + 1;
      if (
        nameCount[file.originalName] > 1 &&
        !duplicates.includes(file.originalName)
      ) {
        duplicates.push(file.originalName);
      }
    });

    if (duplicates.length > 0) {
      toast.error('Algum arquivo está duplicado.');
    }
  }, [files]); // Agora o efeito é acionado quando files muda

  const handleOpenModal = id => {
    setSelectedFileId(id);
    setOpenModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);

  const handleToggleFix = async id => {
    try {
      const response = await axios.put(`/files/fix/${id}`);
      setFiles(prevFiles =>
        prevFiles.map(file =>
          file._id === id ? { ...file, fixed: response.data.fixed } : file
        )
      );
    } catch (error) {
      toast.error('Erro ao atualizar fixação.');
    }
  };

  const handleDeleteConfirmed = async () => {
    try {
      await axios.delete(`/files/delete/${selectedFileId}`);
      setFiles(prevFiles =>
        prevFiles.filter(file => file._id !== selectedFileId)
      );
    } catch (error) {
      console.error('Erro ao excluir o arquivo:', error);
      toast.error('Erro ao excluir o arquivo.');
    }
    setOpenModal(false);
  };

  const handleDownload = async (filename, originalName, channelSlug) => {
    try {
      const response = await axios.get(`/files/download/${filename}`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      const downloadName = `${originalName}_${channelSlug}.xlsx`; // Nome final do arquivo baixado

      link.href = url;
      link.setAttribute('download', downloadName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      toast.error('Erro ao baixar o arquivo.');
    }
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
              <th>Fixar</th>
              <th>Arquivo</th>
              <th>Canal</th>
              <th>Download</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {files.map(
              ({ _id, filename, originalName, channel_slug, fixed }) => (
                <tr key={_id}>
                  <td>
                    <button
                      className="pin-btn"
                      onClick={() => handleToggleFix(_id)}
                    >
                      <FaThumbtack color={!fixed ? '#f4c542' : '#0056b3'} />
                    </button>
                  </td>
                  <td>{originalName}</td>
                  <td>{channel_slug}</td>
                  <td>
                    <button
                      className="download-btn"
                      onClick={() =>
                        handleDownload(filename, originalName, channel_slug)
                      }
                    >
                      Baixar
                    </button>
                  </td>

                  <td>
                    {!fixed && (
                      <button
                        className="delete-btn"
                        onClick={() => handleOpenModal(_id)}
                      >
                        Excluir
                      </button>
                    )}
                  </td>
                </tr>
              )
            )}
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
