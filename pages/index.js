import Head from 'next/head';
import { useState, useEffect } from 'react';
import ChecklistList from 'src/ChecklistList';
import styles from 'styles/Home.module.css';

export default function Index() {
  const [checklists, setChecklists] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

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

  return (
    <>
      <Head>
        <title>Checklister | Home</title>
      </Head>
      <div className={styles.card}>
        <div className={`${styles.header} ${isAdmin ? styles['header-admin'] : ''}`}>
          <h1 className={styles.h1}>Checklister</h1>
          {isAdmin && (
            <a className={styles.a} href='/checklists/add'>
              <div className={styles.button}>Add Checklist</div>
            </a>
          )}
        </div>
        <ChecklistList checklists={checklists} />
      </div>
    </>
  );
}
