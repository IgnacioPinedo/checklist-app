import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Checklist from 'src/Checklist';

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
      }
    });
  }, [checklistId]);

  if (!checklist) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{`Checklister | ${checklist.name}`}</title>
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
        <h1 style={{ margin: '0 auto', width: 'fit-content', padding: '2.5rem 0' }}>
          {checklist.name}
        </h1>
        <Checklist checklist={checklist} />
      </div>
    </>
  );
}
