import { useState, useEffect } from 'react';
import AppV1 from './v1/AppV1';
import AppV2 from './v2/AppV2';

const App = () => {
  // Determine if viewport matches mobile screens (< 1024px)
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 1024;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile ? <AppV1 /> : <AppV2 />;
};

export default App;
