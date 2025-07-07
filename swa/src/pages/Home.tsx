import { BACKEND_URL } from '../api/axiosInstance';
import reactLogo from '../assets/react.svg';
import viteLogo from '/vite.svg';

const Home = () => {
  return (
    <>
      <div>
        <a href="https://vite.dev" rel="noreferrer" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" rel="noreferrer" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <a
        href={`${BACKEND_URL}/.auth/login/google`}
      >
        Log in with Google
      </a>
    </>
  );
};

export default Home;
