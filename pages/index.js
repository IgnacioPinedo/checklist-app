/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import ChecklistList from 'src/ChecklistList';
import Dropdown from 'src/Dropdown';
import styles from 'styles/Home.module.css';

const allowedSortingValues = [
  {
    name: 'Name (A-Z)',
    value: {
      sortBy: 'name',
      orderBy: 'asc',
    },
  },
  {
    name: 'Name (Z-A)',
    value: {
      sortBy: 'name',
      orderBy: 'desc',
    },
  },
  {
    name: 'Created (Oldest-Newest)',
    value: {
      sortBy: 'createdAt',
      orderBy: 'asc',
    },
  },
  {
    name: 'Created (Newest-Oldest)',
    value: {
      sortBy: 'createdAt',
      orderBy: 'desc',
    },
  },
  {
    name: 'Updated (Oldest-Newest)',
    value: {
      sortBy: 'updatedAt',
      orderBy: 'asc',
    },
  },
  {
    name: 'Updated (Newest-Oldest)',
    value: {
      sortBy: 'updatedAt',
      orderBy: 'desc',
    },
  },
];

export default function Index() {
  const router = useRouter();
  const [checklists, setChecklists] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState('');
  const [sorting, setSorting] = useState(allowedSortingValues[0]);

  useEffect(() => {
    fetch(
      `/api/v1/checklists?sort_by=${sorting.value.sortBy}&order_by=${sorting.value.orderBy}`,
    ).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setChecklists(data.data.checklists);
        });
      }
    });
  }, [sorting]);

  useEffect(() => {
    fetch('/api/v1/verify').then((response) => {
      if (response.ok) setIsAdmin(true);
    });
  }, []);

  const handleDeleteChecklist = async (slug) => {
    const response = await fetch(`/api/v1/checklists/${slug}`, { method: 'DELETE' });

    if (response.ok) {
      const newChecklists = checklists.filter((checklist) => checklist.slug !== slug);
      setChecklists(newChecklists);
    } else {
      const data = await response.json();
      setError(data.data.error);
      setTimeout(() => setError(''), 5000);
    }
  };

  const handleDuplicateChecklist = async (slug) => {
    const response = await fetch(`/api/v1/checklists/${slug}/duplicate`, { method: 'POST' });

    if (response.ok) {
      const data = await response.json();
      router.push(`/checklists/${data.data.slug}`);
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
          <Dropdown possibleValues={allowedSortingValues} value={sorting} setValue={setSorting} />
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
