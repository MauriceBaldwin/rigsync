import { BrowserRouter, Routes, Route } from 'react-router';

import RigSyncAuthProvider from './components/RigSyncAuthProvider.tsx';
import PageLayout from './layouts/PageLayout.tsx';
import RequireAuthLayout from './layouts/RequireAuthLayout.tsx';
import Home from './pages/home/index.tsx';
import AADs from './pages/aads/index.tsx';
import AAD from './pages/aads/[aadId].tsx';
import Containers from './pages/container/index.tsx';
import Container from './pages/container/[containerId].tsx';
import MainCanopies from './pages/main-canopies/index.tsx';
import MainCanopy from './pages/main-canopies/[mainCanopyId].tsx';
import ReserveCanopies from './pages/reserve-canopies/index.tsx';
import ReserveCanopy from './pages/reserve-canopies/[reserveCanopyId].tsx';
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
              <Route path="aads">
                <Route index element={<AADs />} />
                <Route path=":aadId" element={<AAD />} />
              </Route>
              <Route path="containers">
                <Route index element={<Containers />} />
                <Route path=":containerId" element={<Container />} />
              </Route>
              <Route path="main-canopies">
                <Route index element={<MainCanopies />} />
                <Route path=":mainCanopyId" element={<MainCanopy />} />
              </Route>
              <Route path="reserve-canopies">
                <Route index element={<ReserveCanopies />} />
                <Route path=":reserveCanopyId" element={<ReserveCanopy />} />
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
