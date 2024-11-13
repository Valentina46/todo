import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./Login.module.css"
import { authenticateUser } from './../../helpers/authHelper/authHelper';

interface LoginProps {
  onLogin: (success: boolean) => void;
}
export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isAuthenticated = await authenticateUser(username, password);

      if (isAuthenticated) {
        onLogin(true);
        navigate('/todo'); // Перенаправление на todo страницу
      } else {
        setError('Неверный логин или пароль');
        onLogin(false);
      }
  };
  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.title}>Вход</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div>
          <label className={styles.label} htmlFor="username">Логин</label>
          <input
            className={styles.input}
            placeholder="Логин"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label className={styles.label}  htmlFor="password">Пароль</label>
          <input
            className={styles.input}
            placeholder="Пароль"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className={styles.button} type="submit">Войти</button>
        {error && <p>{error}</p>}
      </form>
    </div>
    );
};


