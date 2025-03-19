import { createContext, useState, useEffect } from 'react';
import axios from '../services/axios'; // Certifique-se de que esse arquivo configura o axios corretamente
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token });
    }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post('/api/auth/login', {
        username,
        password,
      });

      localStorage.setItem('token', response.data.token);
      setUser({ token: response.data.token });
      toast.success('Logado com sucesso!');
    } catch (error) {
      console.error(
        'Erro no login:',
        error.response?.data?.message || error.message
      );
      toast.error('Erro ao entrar com usuário!');
    }
  };

  const register = async (username, password) => {
    try {
      await axios.post('/api/auth/register', { username, password });
      toast.success('Registrado com sucesso!');
    } catch (error) {
      console.error(
        'Erro no cadastro:',
        error.response?.data?.message || error.message
      );
      toast.error('Erro ao registrar com usuário!');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
