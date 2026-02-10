import { useEffect, useState } from "react";
import { Location, useLocation, useNavigate } from "react-router";

export type RigSyncAuth = {
  authToken: string | undefined;
  userId: string | undefined;
}

type AuthData = {
  authenticationToken: string;
  userId: string;
};

/**
 * Auth data is expected to be appended to the url in the following format:
 *#token=%7B"authenticationToken"%3A"_"%2C"user"%3A%7B"userId"%3A"sid%3A_"%7D%7D
 * 
 * This function decodes the hash, removes the '#token=' prefix,
 * and checks if the resulting JSON object has the following structure:
 * {
 *   authenticationToken: string,
 *   user: {
 *     userId: string
 *   }
 * }
 */
const extractAuthData = (location: Location): AuthData | undefined => {
  if (process.env.NODE_ENV === 'development') {
    return {
      authenticationToken: 'dev-auth-token',
      userId: 'dev-user-id',
    };
  }

  const hash = location.hash;

  if (!hash || !hash.startsWith('#token=')) {
    return undefined;
  }

  const hashDecoded = decodeURIComponent(hash).replace('#token=', '');

  if (!hashDecoded) {
    return undefined;
  }

  const authData: unknown = JSON.parse(hashDecoded);

  if (
    // authData is an object
    typeof authData === 'object' &&
    authData !== null &&
    !Array.isArray(authData) &&

    // authenticationToken property exists on authData
    'authenticationToken' in authData &&
    typeof authData.authenticationToken === 'string' &&

    // user property exists on authData
    'user' in authData &&

    // user property is an object
    typeof authData.user === 'object' &&
    authData.user !== null &&
    !Array.isArray(authData.user) &&

    // userId property exists on user object
    'userId' in authData.user &&
    typeof authData.user.userId === 'string'
  ) {
    return {
      authenticationToken: authData.authenticationToken,
      userId: authData.user.userId,
    };
  }

  return undefined;
};

const useRigSyncAuth = (): RigSyncAuth => {
  const [authToken, setAuthToken] = useState<string | undefined>(undefined);
  const [userId, setUserId] = useState<string | undefined>(undefined);

  const location = useLocation();
  const navigate = useNavigate();

  /**
   * Remove auth data from URL by navigating to the same path without the hash.
   */
  const removeAuthDataFromUrl = async () => {
    await navigate('#');
  };

  const setAuthData = async () => {
    const authData = extractAuthData(location);

    if (authData) {
      setAuthToken(authData.authenticationToken);
      setUserId(authData.userId);

      await removeAuthDataFromUrl();
    }
  };

  useEffect(() => {
    void setAuthData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.hash]);

  return {
    authToken,
    userId,
  };
};

export default useRigSyncAuth;