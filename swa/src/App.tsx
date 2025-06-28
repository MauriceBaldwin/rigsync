import { BrowserRouter, Routes, Route } from 'react-router';

import Home from './pages/Home.tsx';
import MainCanopies from './pages/main-canopies/index.tsx';
import MainCanopy from './pages/main-canopies/[mainCanopyId].tsx';
import NotFound from './pages/errors/NotFound.tsx';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import PageLayout from './layouts/PageLayout.tsx';

const App = () => (
  < BrowserRouter >
    <Routes>
      <Route element={<PageLayout />} >
        <Route index element={<Home />} />

        <Route path="main-canopies">
          <Route index element={<MainCanopies />} />
          <Route path=":mainCanopyId" element={<MainCanopy />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter >
);

export default App;
