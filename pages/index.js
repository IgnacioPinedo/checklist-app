import * as React from 'react';
import Head from 'next/head';

export default function Index() {
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
            fontFamily: 'Montserrat, sans-serif'
        }}
      >
        <h1 style={{ margin: '0 auto', width: 'fit-content', paddingTop: '25px' }}>Checklister</h1>
        <h2 style={{ margin: '0 auto', width: 'fit-content', padding: '25px 0' }}>
          🚧 UNDER CONSTRUCTION 🚧
        </h2>
      </div>
    </>
  );
}
