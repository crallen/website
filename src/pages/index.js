import Companies from '../components/Companies';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Skills from '../components/Skills';
import Summary from '../components/Summary';
import DefaultLayout from '../layouts/DefaultLayout';

export default function Home() {
  return (
    <DefaultLayout>
      <section id="intro">
        <div className="wrapper">
          <Header menuClassName="overlay" />
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
      </section>
      <Summary />
      <Skills />
      <Companies />
    </DefaultLayout>
  );
}
