import { useEffect } from "react";
import { useParams } from "react-router";
import { AxiosRequestConfig } from "axios";
import { CircularProgress, Stack } from "@mui/material";
import useApi from "../../hooks/useApi";
import {
  reserveCanopyDelete,
  reserveCanopyRead,
  ReserveCanopyResponse,
} from "../../api";
import RigSyncEntityLoadError from
  "../../components/errors/RigSyncEntityLoadError";
import UpdateForm from
  "../../components/forms/reserveCanopy/UpdateForm";
import RigSyncDelete from "../../components/RigSyncDelete";
import { returnToReserveCanopiesLink } from "../../components/links/links";
import RigSyncTitle from "../../components/RigSyncTitle";

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
          link={returnToReserveCanopiesLink}
        />
      }

      {!error &&
        <>
          <RigSyncTitle
            title="Reserve canopy"
            link={returnToReserveCanopiesLink}
          />

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
                successRedirect={returnToReserveCanopiesLink.to}
              />
            </>
          }
        </>
      }
    </Stack>
  );
};

export default ReserveCanopy;
