import * as React from 'react';
import Head from 'next/head';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

export default function Index() {
  return (
    <>
      <Head>
        <title>Checklister | Home</title>
      </Head>
      <Container maxWidth='md' sx={{ my: { xs: 0, sm: 4 }, px: { xs: 0, sm: 4 }, py: 0 }}>
        <Paper elevation={4} sx={{ borderRadius: { xs: 0, sm: 1 } }}>
          <h1 style={{ margin: '0 auto', width: 'fit-content', paddingTop: '25px' }}>
            Checklister
          </h1>
          <h2 style={{ margin: '0 auto', width: 'fit-content', padding: '25px 0' }}>
            🚧 UNDER CONSTRUCTION 🚧
          </h2>
        </Paper>
      </Container>
    </>
  );
}
