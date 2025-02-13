import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuUserRound, LuLock } from "react-icons/lu";
import styles from './Login.module.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('joshuayherrera@gmail.com'); // Solo para pruebas ⚠
  const [password, setPassword] = useState('12345678'); // Solo para pruebas ⚠

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Solo para pruebas ⚠
    setTimeout(() => {
      console.log('Simulación de login exitoso');
      navigate('/admin/dashboard');
    }, 500);
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        navigate('/admin/dashboard');
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <div className={styles.formWrapper}>
          <div className={styles.header}>
            <div className={styles.logoContainer}>
              <div className={styles.logoWrapper}>
                <div className={styles.logoIcons}>
                  <img src="/src/assets/logo.svg" alt="Logo" />
                </div>
              </div>
            </div>
            <h2 className={styles.title}>Iniciar sesión</h2>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <div className={styles.inputIcon}>
                <LuUserRound size={20} />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                placeholder="Email"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputIcon}>
                <LuLock size={20} />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                placeholder="Contraseña"
                required
              />
            </div>

            <div className={styles.buttonContainer}>
              <button type="submit" className={styles.button}>
                Iniciar sesión
              </button>
            </div>

            <div className={styles.forgotPasswordContainer}>
              <a href="#" className={styles.forgotPassword}>
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </form>
        </div>
      </div>

      <div className={styles.imageSection}>
        <div className={styles.imageOverlay}></div>
      </div>
    </div>
  );
}

export default Login;