import Link from 'next/link';

export default function Menu({ onMenuClose }) {
  return (
    <aside id="menu">
      <a href="#" className="bi bi-x-lg" onClick={onMenuClose}></a>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
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
