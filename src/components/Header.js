import { useMenu } from './MenuContext';

export default function Header(props) {
  const { setOpen } = useMenu();

  function openMenu(e) {
    e.preventDefault();
    setOpen(true);
  }

  return (
    <header>
      <div className="brand">chrisallen.dev</div>
      <div className="nav-area">
        <a href="#" className={`bi bi-list ${props.menuClassName}`} onClick={openMenu}></a>
      </div>
    </header>
  );
}
