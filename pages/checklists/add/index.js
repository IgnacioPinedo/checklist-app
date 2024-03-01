/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import CheckListForm from 'src/ChecklistForm';
import styles from 'styles/ChecklistAdd.module.css';

export default function Index() {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleAddChecklist = async (checklist) => {
    const response = await fetch('/api/v1/checklists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...checklist }),
    });

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
        <title>Checklister | Add Checklist</title>
      </Head>
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <Link className={styles.a} href='/'>
            <span className='material-symbols-outlined'>home</span>
          </Link>
          <br />
          <img src='/logo-horizontal.svg' alt='Checklister Logo' className={styles.logo} />
          <h1 className={styles.h1}>Add Checklist</h1>
          <CheckListForm
            submitChecklist={handleAddChecklist}
            error={error}
            submitButtonValue='Add Checklist'
          />
        </div>
      </div>
    </>
  );
}
