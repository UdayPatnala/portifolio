import { useState } from 'react';
import AppV1 from './v1/AppV1';
import AppV2 from './v2/AppV2';

const App = () => {
  // Check user preference in localStorage, defaulting to Version 2 (V2)
  const [version, setVersion] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_version');
      return saved !== null ? saved : 'v2';
    } catch {
      return 'v2';
    }
  });

  return version === 'v1' ? (
    <AppV1 setVersion={setVersion} />
  ) : (
    <AppV2 setVersion={setVersion} />
  );
};

export default App;
