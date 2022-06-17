import Header from './Header';
import { useIsMenuOpen } from './hooks';
import Menu from './Menu';
import Summary from './Summary';

export default function Intro() {
  const { setIsMenuOpen } = useIsMenuOpen();

  function onMenuOpen(e) {
    e.preventDefault();
    setIsMenuOpen(true);
  }

  function onMenuClose(e) {
    e.preventDefault();
    setIsMenuOpen(false);
  }

  return (
    <>
      <Menu onMenuClose={onMenuClose} />
      <section id="intro">
        <div className="wrapper">
          <Header onMenuOpen={onMenuOpen} />
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
    </>
  );
}
