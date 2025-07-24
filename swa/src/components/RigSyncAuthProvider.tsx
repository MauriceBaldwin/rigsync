import { PropsWithChildren } from "react";
import useRigSyncAuth from "../hooks/useRigSyncAuth";
import RigSyncAuthContext from "../context/RigSyncAuthContext";


const RigSyncAuthProvider = ({ children }: PropsWithChildren) => {
  const auth = useRigSyncAuth();

  return (
    <RigSyncAuthContext.Provider value={auth}>
      {children}
    </RigSyncAuthContext.Provider>
  );
};

export default RigSyncAuthProvider;