import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import CheckListForm from 'src/ChecklistForm';
import styles from 'styles/ChecklistAdd.module.css';

export default function Index() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [existingChecklist, setExistingChecklist] = useState(null);

  const { id: checklistId } = router.query;

  useEffect(() => {
    if (!checklistId) {
      return;
    }

    fetch(`/api/v1/checklists/${checklistId}`).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setExistingChecklist(data.data.checklist);
        });
      } else {
        router.push('/');
      }
    });
  }, [checklistId]);

  if (!existingChecklist) {
    return null;
  }

  const handleUpdateChecklist = async (checklist) => {
    const response = await fetch(`/api/v1/checklists/${checklistId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...checklist }),
    });

    if (response.ok) {
      router.push(`/checklists/${checklistId}`);
    } else {
      const data = await response.json();
      setError(data.data.error);
      setTimeout(() => setError(''), 5000);
    }

    console.log(checklist);
  };

  return (
    <>
      <Head>
        <title>Checklister | Add Checklist</title>
      </Head>
      <div className={styles.card}>
        <a className={styles.a} href='/'>
          <span className='material-symbols-outlined'>home</span>
        </a>
        <h1 className={styles.h1}>Edit Checklist</h1>
        <CheckListForm
          submitChecklist={handleUpdateChecklist}
          error={error}
          existingChecklist={existingChecklist}
          submitButtonValue='Update Checklist'
        />
      </div>
    </>
  );
}
