import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import styles from './AdminLayout.module.css';

const AdminLayout: React.FC = () => {
  return (
    <div className={styles.adminContainer}>
      <Sidebar />

      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
