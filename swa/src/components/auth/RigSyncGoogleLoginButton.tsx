import { Google } from "@mui/icons-material";
import RigSyncLoginButton from "./RigSyncLoginButton";
import { BACKEND_URL } from "../../api/axiosInstance";

const RigSyncGoogleLoginButton = () => {
  const AUTH_URL = `${BACKEND_URL}/.auth/login/google`;
  const REDIRECT_PARAM =
    `post_login_redirect_uri=${import.meta.env.VITE_SELF_URL ?? ''}`;

  return (
    <RigSyncLoginButton
      authUrl={`${AUTH_URL}?${REDIRECT_PARAM}`}
      icon={<Google />}
    >
      Login with Google
    </RigSyncLoginButton>
  );
};

export default RigSyncGoogleLoginButton;