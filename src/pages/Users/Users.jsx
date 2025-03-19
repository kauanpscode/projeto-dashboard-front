import { useState, useEffect } from 'react';
import axios from '../../services/axios';
import { toast } from 'react-toastify';
import { BiSolidUserPlus } from 'react-icons/bi';
import UserFormModal from '../../components/UserFormModal/UserFormModal';
import './style.css';
import Loading from '../../components/Loading/Loading';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    name: '',
    channel: '',
    shift: '',
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/users');
        setUsers(response.data);
      } catch (error) {
        toast.error('Erro ao carregar usuários.');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleCreateUser = async () => {
    if (!currentUser.name || !currentUser.channel || !currentUser.shift) {
      toast.error('Preencha todos os campos.');
      return;
    }

    try {
      if (currentUser._id) {
        const response = await axios.put(
          `/users/${currentUser._id}`,
          currentUser
        );
        setUsers(
          users.map(user =>
            user._id === currentUser._id ? response.data : user
          )
        );
        toast.success('Usuário atualizado com sucesso!');
      } else {
        const response = await axios.post('/users', currentUser);
        setUsers([...users, response.data]);
        toast.success('Usuário criado com sucesso!');
      }
      closeModal();
    } catch (error) {
      toast.error('Erro ao salvar usuário.');
    }
  };

  const handleEditUser = user => {
    setCurrentUser(user);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentUser({ name: '', channel: '', shift: '' });
  };

  const handleDelete = async _id => {
    try {
      await axios.delete(`/users/${_id}`);
      setUsers(users.filter(user => user._id !== _id));
      toast.success('Usuário excluído com sucesso!');
    } catch (error) {
      toast.error('Erro ao excluir usuário.');
    }
  };

  return (
    <div className="users-container">
      <h1 className="users-title">Lista de Usuários</h1>
      <button
        className="edit-btn add-user-btn"
        onClick={() => setModalOpen(true)}
      >
        <BiSolidUserPlus />
      </button>

      <UserFormModal
        isOpen={modalOpen}
        onClose={closeModal}
        user={currentUser}
        onChange={setCurrentUser}
        onSubmit={handleCreateUser}
      />

      {loading ? (
        <Loading />
      ) : (
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Canal</th>
              <th>Turno</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.channel}</td>
                <td>{user.shift}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEditUser(user)}
                  >
                    Editar
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(user._id)}
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Users;
