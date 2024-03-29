import Head from 'next/head';
import Script from 'next/script';
import Menu from '../components/Menu';

export default function DefaultLayout(props) {
  return (
    <>
      <Head>
        <title>chrisallen.dev</title>
      </Head>
      <Menu />
      {props.children}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-HQL1C6ZYZZ"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HQL1C6ZYZZ');
          `}
      </Script>
    </>
  );
}
