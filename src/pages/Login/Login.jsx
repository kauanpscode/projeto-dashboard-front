import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './style.css';

const Login = () => {
  const { login, register, isAuthenticated } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    if (isRegistering) {
      await register(username, password);
    } else {
      await login(username, password);
    }
    setLoading(false);
  };

  if (isAuthenticated) {
    return <p className="message">Você já está logado!</p>;
  }

  return (
    <div className="auth-container">
      <h2 className="auth-title">{isRegistering ? 'Cadastro' : 'Login'}</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Carregando...' : isRegistering ? 'Cadastrar' : 'Entrar'}
        </button>
      </form>
    </div>
  );
};

export default Login;
