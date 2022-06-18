import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Menu() {
  function closeMenu(e) {
    e.preventDefault();
    document.querySelector('body').classList.remove('menu-open');
  }

  const router = useRouter();

  return (
    <aside id="menu">
      <a href="#" className="bi bi-x-lg" onClick={closeMenu}></a>
      <nav>
        <ul>
          <li className={router.pathname == '/' ? 'active' : undefined}>
            <Link href="/">Home</Link>
          </li>
          <li className={router.pathname == '/about' ? 'active' : undefined}>
            <a>About</a>
          </li>
          <li>
            <a>Blog</a>
          </li>
          <li>
            <a>Contact</a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
