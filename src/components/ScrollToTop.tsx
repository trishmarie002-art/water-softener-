import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  // Use useLayoutEffect for synchronous scroll before paint
  useLayoutEffect(() => {
    // Force instant scroll to top, bypassing smooth scroll CSS
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    
    // Also scroll the document element and body as fallback
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return null;
}
