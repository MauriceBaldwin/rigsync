import { BrowserRouter, Routes, Route } from 'react-router';

import RigSyncAuthProvider from './components/RigSyncAuthProvider.tsx';
import PageLayout from './layouts/PageLayout.tsx';
import RequireAuthLayout from './layouts/RequireAuthLayout.tsx';
import Home from './pages/home/index.tsx';
import MainCanopies from './pages/main-canopies/index.tsx';
import MainCanopy from './pages/main-canopies/[mainCanopyId].tsx';
import NotFound from './pages/errors/NotFound.tsx';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const App = () => {
  return (
    < BrowserRouter >
      <RigSyncAuthProvider>
        <Routes>
          <Route element={<PageLayout />} >
            <Route index element={<Home />} />

            <Route element={<RequireAuthLayout />} >
              <Route path="main-canopies">
                <Route index element={<MainCanopies />} />
                <Route path=":mainCanopyId" element={<MainCanopy />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </RigSyncAuthProvider>
    </BrowserRouter >
  );
};

export default App;
