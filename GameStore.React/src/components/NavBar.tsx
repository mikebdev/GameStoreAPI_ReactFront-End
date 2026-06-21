import { NavLink } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand">
        <span className="logo">🎮</span>
        <span className="brand-text">GameStore</span>
      </NavLink>
      <div className="navbar-links">
        <NavLink to="/" end className="nav-link">
          Games
        </NavLink>
        <NavLink to="/games/new" className="nav-link">
          + Add Game
        </NavLink>
      </div>
    </nav>
  );
}
