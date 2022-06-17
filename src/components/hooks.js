import { useEffect, useState } from 'react';

export function useIsMenuOpen() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.querySelector('body').classList.add('menu-open');
    } else {
      document.querySelector('body').classList.remove('menu-open');
    }
  });

  return { isMenuOpen, setIsMenuOpen };
}
