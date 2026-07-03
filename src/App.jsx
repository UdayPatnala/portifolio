import { useState } from 'react';
import AppV1 from './v1/AppV1';
import AppV2 from './v2/AppV2';

const App = () => {
  // Randomly select v1 or v2 on every page load/refresh
  const [version] = useState(() => {
    return Math.random() < 0.5 ? 'v1' : 'v2';
  });

  return version === 'v1' ? <AppV1 /> : <AppV2 />;
};

export default App;
