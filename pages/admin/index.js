import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import AdminForm from 'src/AdminForm';
import styles from 'styles/ChecklistAdd.module.css';

export default function Index() {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleLogin = async (password) => {
    const response = await fetch('/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    });

    if (response.ok) {
      router.push('/');
    } else {
      const data = await response.json();
      setError(data.data.error);
      setTimeout(() => setError(''), 5000);
    }
  };

  return (
    <>
      <Head>
        <title>Checklister | Admin Login</title>
      </Head>
      <div className={styles.card}>
        <Link className={styles.a} href='/'>
          <span className='material-symbols-outlined'>home</span>
        </Link>
        <h1 className={styles.h1}>Admin Login</h1>
        <AdminForm login={handleLogin} error={error} />
      </div>
    </>
  );
}
