// src/axios.js
import axios from "axios";

// Configuração do axios para consumir a API do localhost
const api = axios.create({
  baseURL: "http://52.55.211.70:3000", // Substitua pela sua URL da API local
  timeout: 10000, // Timeout de 10 segundos
});

export default api;
