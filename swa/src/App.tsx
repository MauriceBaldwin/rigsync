import { BrowserRouter, Routes, Route } from 'react-router';

import Home from './pages/Home.tsx';
import Examples from './pages/Examples.tsx';
import NotFound from './pages/errors/NotFound.tsx';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const App = () => (
  < BrowserRouter >
    <Routes>
      <Route index element={<Home />} />
      <Route path="examples" element={<Examples />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter >
);

export default App;
