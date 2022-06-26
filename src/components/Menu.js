import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMenu } from './MenuContext';

export default function Menu() {
  const { setOpen } = useMenu();
  const router = useRouter();

  function closeMenu(e) {
    e.preventDefault();
    setOpen(false);
  }

  return (
    <aside id="menu">
      <a href="#" className="bi bi-x-lg" onClick={closeMenu}></a>
      <nav>
        <ul>
          <li className={router.pathname == '/' ? 'active' : undefined}>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li className={router.pathname == '/about' ? 'active' : undefined}>
            <Link href="/about">
              <a>About</a>
            </Link>
          </li>
          {/* <li>
            <a>Blog</a>
          </li> */}
          <li className={router.pathname == '/contact' ? 'active' : undefined}>
            <Link href="/contact">
              <a>Contact</a>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
