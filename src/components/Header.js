export default function Header() {
  function openMenu(e) {
    e.preventDefault();
    document.querySelector('body').classList.add('menu-open');
  }

  return (
    <header>
      <div className="brand">chrisallen.dev</div>
      <div className="nav-area">
        <a href="#" className="overlay bi bi-list" onClick={openMenu}></a>
      </div>
    </header>
  );
}
