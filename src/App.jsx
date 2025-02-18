import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyle from './styles/GlobalStyles';
import Sidebar from "./components/Sidebar/Sidebar";
import './styles/GlobalStyles.js';

import Arquivos from './pages/Arquivos/Arquivos.jsx';
import Reports from "./pages/Reports/Reports.jsx";
import Home from "./pages/Home/Home.jsx";
import User from "./pages/Users/Users.jsx";
import Login from "./pages/Login/Login.jsx";

import { ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Arquivos" element={<Arquivos />} />
            <Route path="/users" element={<User />} />
            <Route path="/Reports" element={<Reports />} />
            <Route path="/Login" element={<Login />} />
          </Routes>
        </div>
      </div>
      <GlobalStyle />
      <ToastContainer />
    </Router>
  );
}

export default App;
