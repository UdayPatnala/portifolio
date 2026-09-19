import { useState, useEffect, lazy, Suspense } from 'react';
import AppV2 from './v2/AppV2';

const AppV1 = lazy(() => import('./v1/AppV1'));

const App = () => {
  const [route, setRoute] = useState(() => (typeof window !== 'undefined' ? window.location.hash : ''));

  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (route === '#/v1') {
    return (
      <Suspense fallback={<div className="min-h-screen bg-slate-950 text-emerald-400 p-8 font-mono text-sm flex items-center justify-center">Loading legacy view...</div>}>
        <AppV1 />
      </Suspense>
    );
  }

  return <AppV2 />;
};

export default App;

