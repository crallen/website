export default function Header({ onMenuOpen }) {
  return (
    <header>
      <div className="brand">chrisallen.dev</div>
      <div className="nav-area">
        <a href="#" className="overlay bi bi-list" onClick={onMenuOpen}></a>
      </div>
    </header>
  );
}
