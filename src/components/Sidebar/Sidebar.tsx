import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css';

const Sidebar: React.FC = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <img src="/src/assets/logo.svg" alt="El Aereo" />
      </div>

      <nav>
        <ul>
          <li>
            <Link to="/admin/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/admin/users">Usuarios</Link>
          </li>
          {/* Toca agregar más enlaces como esta en el SRS :D */}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
