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
  reserveCanopyDelete,
  reserveCanopyRead,
  ReserveCanopyResponse,
} from "../../api";
import RigSyncEntityLoadError from
  "../../components/errors/RigSyncEntityLoadError";
import RigSyncPageLink from
  "../../components/RigSyncPageLink";
import UpdateForm from
  "../../components/forms/reserveCanopy/UpdateForm";
import RigSyncDelete from "../../components/RigSyncDelete";

const returnLink = {
  to: '/reserve-canopies',
  title: 'Return to reserve canopies',
  isReturn: true,
};

const ReserveCanopy = () => {
  const { reserveCanopyId } = useParams();

  const {
    response,
    isLoading,
    error,
    makeRequest,
  } = useApi<ReserveCanopyResponse>();

  useEffect(() => {
    if (reserveCanopyId) {
      makeRequest(
        (options?: AxiosRequestConfig) =>
          reserveCanopyRead(reserveCanopyId, options),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reserveCanopyId]);

  return (
    <Stack spacing={4} alignItems="baseline">
      {error &&
        <RigSyncEntityLoadError
          error={error}
          entityName="reserve canopy"
          link={returnLink}
        />
      }

      {!error &&
        <>
          <Container disableGutters >
            <Typography variant="h1" color="primary">Reserve canopy</Typography>
            <RigSyncPageLink link={returnLink} />
          </Container>

          {isLoading &&
            <CircularProgress />
          }

          {response &&
            <>
              <UpdateForm reserveCanopy={response} />
              <RigSyncDelete
                deleteRequest={
                  (options?: AxiosRequestConfig) =>
                    reserveCanopyDelete(response.id, options)
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

export default ReserveCanopy;
