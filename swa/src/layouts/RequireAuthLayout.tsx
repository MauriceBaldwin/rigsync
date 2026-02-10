import { useContext } from "react";
import { Outlet } from "react-router";
import RigSyncAuthContext from "../context/RigSyncAuthContext";
import Unauthorized from "../pages/errors/Unauthorized";

const RequireAuthLayout = () => {
  const authContext = useContext(RigSyncAuthContext);

  return (
    <>
      {
        authContext?.userId
          ?
          <Outlet />
          :
          <Unauthorized />
      }
    </>
  );
};

export default RequireAuthLayout;