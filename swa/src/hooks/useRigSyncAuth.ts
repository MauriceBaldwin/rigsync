import { useEffect, useState } from "react";
import { Location, useLocation, useNavigate } from "react-router";
import { BACKEND_URL } from "../api/axiosInstance";

export type RigSyncAuth = {
  authToken: string | undefined;
  userId: string | undefined;
  email: string | undefined;
  name: string | undefined;
}

type AuthData = {
  authenticationToken: string;
  userId: string;
};

type UserClaims = {
  email?: string;
  name?: string;
}

type UserClaimsResponse = {
  user_claims: { typ: string; val: string; }[];
}

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

const fetchUserClaims = async (authToken: string): Promise<UserClaims> => {
  if (process.env.NODE_ENV === 'development') {
    return {
      email: 'dev-email',
      name: 'dev-name',
    };
  }

  const response = await fetch(`${BACKEND_URL}/.auth/me`, {
    method: 'GET',
    headers: {
      "X-ZUMO-AUTH": authToken,
    },
  });

  if (!response.ok) {
    return {
      email: undefined,
      name: undefined,
    };
  }

  const data = await response.json() as UserClaimsResponse;

  let email: string | undefined = undefined;
  let name: string | undefined = undefined;

  data.user_claims.forEach(claim => {
    switch (claim.typ) {
      // eslint-disable-next-line max-len
      case 'http:\\/\\/schemas.xmlsoap.org\\/ws\\/2005\\/05\\/identity\\/claims\\/emailaddress':
        email = claim.val;
        break;
      case 'name':
        name = claim.val;
        break;
      default:
        break;
    }
  });

  return { email, name };
};

const useRigSyncAuth = (): RigSyncAuth => {
  const [authToken, setAuthToken] = useState<string | undefined>(undefined);
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [name, setName] = useState<string | undefined>(undefined);

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

  const setUserClaims = async () => {
    if (!authToken) {
      setEmail(undefined);
      setName(undefined);

      return;
    }

    const userClaims = await fetchUserClaims(authToken);

    setEmail(userClaims.email);
    setName(userClaims.name);

    return;
  };

  useEffect(() => {
    void setAuthData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.hash]);

  useEffect(() => {
    void setUserClaims();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken]);

  return {
    authToken,
    userId,
    email,
    name,
  };
};

export default useRigSyncAuth;