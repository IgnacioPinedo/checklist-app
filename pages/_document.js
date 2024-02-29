import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='' />
        <link
          href='https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap'
          rel='stylesheet'
        />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap'
        />
      </Head>
      <body
        style={{
          backgroundColor: '#3D3D3D',
          color: 'white',
          margin: 0,
        }}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
