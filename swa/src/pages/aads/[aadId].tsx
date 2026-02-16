import { useEffect } from "react";
import { useParams } from "react-router";
import { AxiosRequestConfig } from "axios";
import {
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import useApi from "../../hooks/useApi";
import {
  aADDelete,
  aADRead,
  AadResponse,
} from "../../api";
import RigSyncEntityLoadError from
  "../../components/errors/RigSyncEntityLoadError";
import RigSyncPageLink from "../../components/RigSyncPageLink";
import UpdateForm from "../../components/forms/aad/UpdateForm";
import RigSyncDelete from "../../components/RigSyncDelete";

const returnLink = {
  to: '/aads',
  title: 'Return to AADs',
  isReturn: true,
};

const AAD = () => {
  const { aadId } = useParams();

  const {
    response,
    isLoading,
    error,
    makeRequest,
  } = useApi<AadResponse>();

  useEffect(() => {
    if (aadId) {
      makeRequest(
        (options?: AxiosRequestConfig) => aADRead(aadId, options),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aadId]);

  return (
    <Stack spacing={4} alignItems="baseline">
      {error &&
        <RigSyncEntityLoadError
          error={error}
          entityName="AAD"
          link={returnLink}
        />
      }

      {!error &&
        <>
          <Container disableGutters >
            <Typography variant="h1" color="primary">AAD</Typography>
            <RigSyncPageLink link={returnLink} />
          </Container>

          {isLoading &&
            <CircularProgress />
          }

          {response &&
            <>
              <UpdateForm aad={response} />
              <RigSyncDelete
                deleteRequest={
                  (options?: AxiosRequestConfig) =>
                    aADDelete(response.id, options)
                }
                successRedirect={returnLink.to}
              />
            </>
          }
        </>
      }
    </Stack>
  );
};

export default AAD;