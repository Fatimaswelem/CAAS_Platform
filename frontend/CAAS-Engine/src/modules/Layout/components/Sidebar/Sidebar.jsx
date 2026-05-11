import { Code, History } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="sidebar-custom d-none d-md-flex flex-column" style={{ height: '100vh' }}>
      <nav className="d-flex flex-column flex-grow-1">
        <NavLink to="/workspace" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <Code className="me-3" size={20} />
          <span>Analyzer</span>
        </NavLink>

        <NavLink to="/history" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <History className="me-3" size={20} />
          <span>History</span>
        </NavLink>
      </nav>
    </div>
  );
}