import { useEffect } from "react";
import { useParams } from "react-router";
import { AxiosRequestConfig } from "axios";
import { CircularProgress, Stack } from "@mui/material";
import useApi from "../../hooks/useApi";
import { rigDelete, rigRead, RigResponse } from "../../api";
import RigSyncEntityLoadError from
  "../../components/errors/RigSyncEntityLoadError";
import RigSyncDelete from "../../components/RigSyncDelete";
import { returnHomeLink } from "../../components/links/links";
import RigSyncTitle from "../../components/RigSyncTitle";

const Rig = () => {
  const { rigId } = useParams();

  const {
    response,
    isLoading,
    error,
    makeRequest,
  } = useApi<RigResponse>();

  useEffect(() => {
    if (rigId) {
      makeRequest(
        (options?: AxiosRequestConfig) =>
          rigRead(rigId, options),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rigId]);

  return (
    <Stack spacing={4} alignItems="baseline">
      {error &&
        <RigSyncEntityLoadError
          error={error}
          entityName="rig"
          link={returnHomeLink}
        />
      }

      {!error &&
        <>
          <RigSyncTitle title="Rig" link={returnHomeLink} />

          {isLoading &&
            <CircularProgress />
          }

          {response &&
            <>
              {/* <UpdateForm reserveCanopy={response} /> */}

              <RigSyncDelete
                deleteRequest={
                  (options?: AxiosRequestConfig) =>
                    rigDelete(response.id, options)
                }
                successRedirect={returnHomeLink.to}
              />
            </>
          }
        </>
      }
    </Stack>
  );
};

export default Rig;
