import { useContext } from "react";
import RigSyncAuthContext from "../../context/RigSyncAuthContext";
import { Typography } from "@mui/material";


const RigSyncUserProfile = () => {
  const authContext = useContext(RigSyncAuthContext);

  return (
    <>
      {
        authContext?.userId && (
          <Typography variant="caption" >
            UserId: authContext.userId
          </Typography>
        )
      }
    </>
  );
};

export default RigSyncUserProfile;