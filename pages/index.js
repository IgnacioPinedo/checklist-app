/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import ChecklistList from 'src/ChecklistList';
import styles from 'styles/Home.module.css';

export default function Index() {
  const router = useRouter();
  const [checklists, setChecklists] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/v1/checklists').then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setChecklists(data.data.checklists);
        });
      }
    });
  }, []);

  useEffect(() => {
    fetch('/api/v1/verify').then((response) => {
      if (response.ok) setIsAdmin(true);
    });
  }, []);

  const handleDeleteChecklist = async (id) => {
    const response = await fetch(`/api/v1/checklists/${id}`, { method: 'DELETE' });

    if (response.ok) {
      const newChecklists = checklists.filter((checklist) => checklist.id !== id);
      setChecklists(newChecklists);
    } else {
      const data = await response.json();
      setError(data.data.error);
      setTimeout(() => setError(''), 5000);
    }
  };

  const handleDuplicateChecklist = async (id) => {
    const response = await fetch(`/api/v1/checklists/${id}/duplicate`, { method: 'POST' });

    if (response.ok) {
      const data = await response.json();
      router.push(`/checklists/${data.data.id}`);
    } else {
      const data = await response.json();
      setError(data.data.error);
      setTimeout(() => setError(''), 5000);
    }
  };

  return (
    <>
      <Head>
        <title>Checklister | Home</title>
      </Head>
      {error && (
        <div className={styles['error-popup']} onClick={() => setError('')}>
          <div className={styles['error-popup-content']}>{error}</div>
        </div>
      )}
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <div className={`${styles.header} ${isAdmin ? styles['header-admin'] : ''}`}>
            <img src='/logo-horizontal.svg' alt='Checklister Logo' className={styles.logo} />
            {isAdmin && (
              <Link className={styles.a} href='/checklists/add'>
                <div className={styles.button}>Add Checklist</div>
              </Link>
            )}
          </div>
          <ChecklistList
            checklists={checklists}
            isAdmin={isAdmin}
            deleteChecklist={handleDeleteChecklist}
            duplicateChecklist={handleDuplicateChecklist}
          />
        </div>
      </div>
    </>
  );
}
