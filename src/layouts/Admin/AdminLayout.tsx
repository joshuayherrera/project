import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import styles from './AdminLayout.module.css';

const AdminLayout: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSidebarToggle = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
  };

  return (
    <div className={styles.adminContainer}>
      <Sidebar onToggle={handleSidebarToggle} />
      <main 
        className={`${styles.mainContent} ${
          !isMobile && isSidebarCollapsed ? styles.contentExpanded : ''
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;