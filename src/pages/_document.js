import { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document(props) {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&display=swap"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            if(window.location.hostname.indexOf('chrisallen.dev') > -1) {
              (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
              (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
              m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
              })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

              ga('create', 'UA-100432822-1', 'auto');
              ga('send', 'pageview');
            }
          `}
        </Script>
      </body>
    </Html>
  );
}
