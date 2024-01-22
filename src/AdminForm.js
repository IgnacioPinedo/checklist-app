
import { useState } from 'react';
import styles from 'styles/ChecklistForm.module.css';

const AdminForm = ({ login, error }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(password);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles['form-main']}>
        <div className={styles['form-main-header']}>
          <label className={styles.label}>Password</label>
        </div>
        <input
          type='password'
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Admin password'
        />
      </div>
      <div className={styles['form-footer']}>
        <input className={styles.submit} type='submit' value='Login' />
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </form>
  );
};

export default AdminForm;
