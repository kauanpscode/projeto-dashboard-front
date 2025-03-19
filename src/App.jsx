import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyles';
import Sidebar from './components/Sidebar/Sidebar';
import './styles/GlobalStyles.js';

import Arquivos from './pages/Arquivos/Arquivos.jsx';
import Reports from './pages/Reports/Reports.jsx';
import Home from './pages/Home/Home.jsx';
import User from './pages/Users/Users.jsx';
import Login from './pages/Login/Login.jsx';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';
import NotFound from './components/NotFound/NotFound.jsx';

import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Sidebar />
          <div className="app-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />

              {/* Rotas protegidas */}
              <Route element={<PrivateRoute />}>
                <Route path="/Arquivos" element={<Arquivos />} />
                <Route path="/users" element={<User />} />
                <Route path="/Reports" element={<Reports />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
        <GlobalStyle />
        <ToastContainer />
      </Router>
    </AuthProvider>
  );
}

export default App;
