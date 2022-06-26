import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export const MenuContext = createContext();

export const MenuContextProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [router.pathname]);

  return <MenuContext.Provider value={{ open, setOpen }}>{children}</MenuContext.Provider>;
};

export const useMenu = () => useContext(MenuContext);
