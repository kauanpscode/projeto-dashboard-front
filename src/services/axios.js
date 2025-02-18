// src/axios.js
import axios from "axios";

// Configuração do axios para consumir a API do localhost
const api = axios.create({
  baseURL: "http://localhost:3000/", // Substitua pela sua URL da API local
  timeout: 10000, // Timeout de 10 segundos
});

export default api;
