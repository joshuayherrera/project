import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LuLayoutDashboard, LuUsers, LuChevronRight, LuMenu, LuX } from "react-icons/lu";
import styles from './Sidebar.module.css';

interface SidebarProps {
  onToggle?: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isOpen, setIsOpen] = useState(!isMobile);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    } else {
      const newCollapsedState = !isCollapsed;
      setIsCollapsed(newCollapsedState);
      onToggle?.(newCollapsedState);
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;

    const currentTouch = e.touches[0].clientX;
    const diff = touchStart - currentTouch;

    if (diff > 50) {
      setIsOpen(false);
      setTouchStart(null);
    } else if (diff < -50) {
      setIsOpen(true);
      setTouchStart(null);
    }
  };

  const handleTouchEnd = () => {
    setTouchStart(null);
  };

  const navItems = [
    {
      path: '/admin/dashboard',
      icon: <LuLayoutDashboard size={20} />,
      text: 'Dashboard'
    },
    {
      path: '/admin/users',
      icon: <LuUsers size={20} />,
      text: 'Usuarios'
    },
  ];

  return (
    <>
      <button 
        className={styles.menuButton}
        onClick={toggleSidebar}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <LuMenu size={24} />
      </button>

      <div 
        className={`${styles.overlay} ${isOpen ? styles.visible : ''}`}
        onClick={() => isMobile && setIsOpen(false)}
        role="presentation"
      />

      <div 
        className={`${styles.sidebarWrapper} ${isOpen ? styles.open : ''}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <aside 
          className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}
          role="navigation"
          aria-label="Main navigation"
        >
          <div className={styles.header}>
            <div className={styles.logoContainer}>
              <img src="/src/assets/logo.svg" alt="El Aereo" />
              <span className={styles.companyName}>El Aereo</span>
            </div>
            {isMobile ? (
              <button 
                className={`${styles.menuButton} ${styles.closeButton}`}
                onClick={() => setIsOpen(false)}
                aria-label="Close sidebar"
              >
                <LuX size={20} />
              </button>
            ) : (
              <button 
                className={styles.menuButton}
                onClick={toggleSidebar}
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                <LuMenu size={20} />
              </button>
            )}
          </div>

          <nav className={styles.nav}>
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(item.path)}
                className={`${styles.navItem} ${isActive(item.path) ? styles.active : ''}`}
                role="link"
                aria-current={isActive(item.path) ? "page" : undefined}
              >
                <span className={styles.navIcon} aria-hidden="true">{item.icon}</span>
                <span className={styles.navText}>{item.text}</span>
                <span className={styles.chevronIcon} aria-hidden="true">
                  <LuChevronRight size={16} />
                </span>
              </button>
            ))}
          </nav>
        </aside>
      </div>
    </>
  );
};

export default Sidebar;