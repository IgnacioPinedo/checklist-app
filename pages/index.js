import Head from 'next/head';
import { useState, useEffect } from 'react';
import ChecklistList from 'src/ChecklistList';

export default function Index() {
  const [checklists, setChecklists] = useState([]);

  useEffect(() => {
    fetch('/api/v1/checklists').then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setChecklists(data.data.checklists);
        });
      }
    });
  }, []);

  return (
    <>
      <Head>
        <title>Checklister | Home</title>
      </Head>
      <div
        style={{
          maxWidth: '900px',
          margin: '1rem auto',
          borderRadius: '1rem',
          boxShadow:
            '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
          fontFamily: 'Montserrat, sans-serif',
        }}
      >
        <h1 style={{ margin: '0 auto', width: 'fit-content', padding: '2.5rem 0' }}>Checklister</h1>
        <ChecklistList checklists={checklists} />
      </div>
    </>
  );
}
