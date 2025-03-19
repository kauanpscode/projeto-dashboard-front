import { Link } from 'react-router-dom';
import { FaHome, FaChartBar, FaUsers } from 'react-icons/fa';
import { GoFileSubmodule } from 'react-icons/go';
import './style.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Relatórios</h2>
      <ul>
        <li>
          <Link to="/">
            <FaHome /> Home
          </Link>
        </li>
        <li>
          <Link to="/arquivos">
            <GoFileSubmodule /> Arquivos
          </Link>
        </li>
        <li>
          <Link to="/users">
            <FaUsers /> Usuários
          </Link>
        </li>
        <li>
          <Link to="/reports">
            <FaChartBar /> Reports
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
