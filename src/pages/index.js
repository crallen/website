import Script from 'next/script';
import Companies from '../components/Companies';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Menu from '../components/Menu';
import Skills from '../components/Skills';
import Summary from '../components/Summary';

export default function Home() {
  return (
    <>
      <Menu />
      <section id="intro">
        <div className="wrapper">
          <Header />
          <div className="container">
            <div className="inner">
              <h1>
                <span className="overlay">Hi, I&apos;m Chris</span>
              </h1>
              <p>
                <span className="overlay">I build software and stuff</span>
              </p>
            </div>
          </div>
        </div>
        <Summary />
      </section>
      <Skills />
      <Companies />
      <Footer />

      <Script
        src="https://www.googletagmanager.com/gtag/js?id=UA-100432822-1"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-100432822-1');
          `}
      </Script>
    </>
  );
}
