import React from "react";
import "./style.css";

const UserFormModal = ({ isOpen, onClose, user, onChange, onSubmit }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{user?.id ? "Editar Usuário" : "Criar Novo Usuário"}</h2>
        <input
          type="text"
          placeholder="Nome"
          value={user.name}
          onChange={(e) => onChange({ ...user, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Canal"
          value={user.channel}
          onChange={(e) => onChange({ ...user, channel: e.target.value })}
        />
        <input
          type="text"
          placeholder="Turno"
          value={user.shift}
          onChange={(e) => onChange({ ...user, shift: e.target.value })}
        />
        <div className="modal-buttons">
          <button className="submit-btn" onClick={onSubmit}>
            Salvar
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserFormModal;
