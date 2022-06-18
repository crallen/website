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
    </>
  );
}
