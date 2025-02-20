import { useState, useEffect } from "react";
import axios from "../../services/axios";
import { toast } from "react-toastify";
import { BiSolidUserPlus } from "react-icons/bi";

import "./style.css";
import Loading from "../../components/Loading/Loading";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", channel: "", shift: "" });
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/users");
        setUsers(response.data);
      } catch (error) {
        toast.error("Erro ao carregar usuários.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleCreateUser = async () => {
    if (!newUser.name || !newUser.channel || !newUser.shift) {
      toast.error("Preencha todos os campos para criar um usuário.");
      return;
    }

    try {
      const response = await axios.post("/users", newUser);
      setUsers((prevUsers) => [...prevUsers, response.data]);
      toast.success("Usuário criado com sucesso!");
      setNewUser({ name: "", channel: "", shift: "" });
      setShowForm(false);
    } catch (error) {
      toast.error("Erro ao criar usuário.");
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  const handleUpdateUser = async () => {
    if (!editingUser.name || !editingUser.channel || !editingUser.shift) {
      toast.error("Preencha todos os campos para atualizar o usuário.");
      return;
    }

    try {
      const response = await axios.put(`/users/${editingUser.id}`, editingUser);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === editingUser.id ? response.data : user
        )
      );
      toast.success("Usuário atualizado com sucesso!");
      setEditingUser(null);
    } catch (error) {
      toast.error("Erro ao atualizar usuário.");
    }
  };

  const handleDelete = async (_id) => {
    console.log(_id)
    try {
      await axios.delete(`/users/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      toast.success("Usuário excluído com sucesso!");
    } catch (error) {
      toast.error("Erro ao excluir o usuário.");
    }
  };

  return (
    <div className="users-container">
      <h1 className="users-title">Lista de Usuários</h1>

      <button
        className="edit-btn add-user-btn"
        onClick={() => setShowForm(!showForm)}
      >
        <BiSolidUserPlus />
      </button>

      {showForm && (
        <div className="create-user-form">
          <h2>Criar Novo Usuário</h2>
          <input
            type="text"
            placeholder="Nome"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Canal"
            value={newUser.channel}
            onChange={(e) => setNewUser({ ...newUser, channel: e.target.value })}
          />
          <input
            type="text"
            placeholder="Turno"
            value={newUser.shift}
            onChange={(e) => setNewUser({ ...newUser, shift: e.target.value })}
          />
          <button className="create-btn" onClick={handleCreateUser}>
            Criar Usuário
          </button>
        </div>
      )}

      {editingUser && (
        <div className="create-user-form">
          <h2>Editar Usuário</h2>
          <input
            type="text"
            placeholder="Nome"
            value={editingUser.name}
            onChange={(e) =>
              setEditingUser({ ...editingUser, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Canal"
            value={editingUser.channel}
            onChange={(e) =>
              setEditingUser({ ...editingUser, channel: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Turno"
            value={editingUser.shift}
            onChange={(e) =>
              setEditingUser({ ...editingUser, shift: e.target.value })
            }
          />
          <button className="update-btn" onClick={handleUpdateUser}>
            Atualizar Usuário
          </button>
          <button className="cancel-btn" onClick={() => setEditingUser(null)}>
            Cancelar
          </button>
        </div>
      )}

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
            {users.map((user) => (
              <tr key={user.id}>
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
                    onClick={() => handleDelete(user.id)}
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
