import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Checklist from 'src/Checklist';
import styles from 'styles/ChecklistId.module.css';

export default function Index() {
  const router = useRouter();
  const [checklist, setChecklist] = useState(undefined);

  const { id: checklistId } = router.query;

  useEffect(() => {
    if (!checklistId) {
      return;
    }

    fetch(`/api/v1/checklists/${checklistId}`).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setChecklist(data.data.checklist);
        });
      } else {
        router.push('/');
      }
    });
  }, [checklistId, router]);

  if (!checklist) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{`Checklister | ${checklist.name}`}</title>
      </Head>
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <Link className={styles.a} href='/'>
            <span className='material-symbols-outlined'>home</span>
          </Link>
          <h1 className={styles.h1}>{checklist.name}</h1>
          <Checklist checklist={checklist} />
        </div>
      </div>
    </>
  );
}
