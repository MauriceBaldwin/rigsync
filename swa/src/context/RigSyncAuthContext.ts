import { createContext } from "react";
import { type RigSyncAuth } from "../hooks/useRigSyncAuth";

const RigSyncAuthContext = createContext<RigSyncAuth | undefined>(undefined);

export default RigSyncAuthContext;