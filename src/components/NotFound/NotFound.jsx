import { Link } from 'react-router-dom';
import './style.css';

export default function NotFound() {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-text">Oops! Página não encontrada.</p>
      <Link to="/" className="not-found-link">
        Voltar para a Home
      </Link>
    </div>
  );
}
