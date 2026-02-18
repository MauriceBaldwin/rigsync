import { useContext } from "react";
import { Link } from 'react-router';
import { Typography } from "@mui/material";
import RigSyncAuthContext from "../../context/RigSyncAuthContext";


const RigSyncUserProfile = () => {
  const authContext = useContext(RigSyncAuthContext);

  return (
    <>
      {
        authContext?.userId && (
          <Typography
            variant="caption"
            color="textPrimary"
            component={Link}
            to="/profile"
            sx={{ textDecoration: "none" }}>
            UserId: {authContext.userId}
          </Typography>
        )
      }
    </>
  );
};

export default RigSyncUserProfile;