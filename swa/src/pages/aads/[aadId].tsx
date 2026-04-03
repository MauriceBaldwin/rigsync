import { useEffect } from "react";
import { useParams } from "react-router";
import { AxiosRequestConfig } from "axios";
import { CircularProgress, Stack } from "@mui/material";
import useApi from "../../hooks/useApi";
import { aADDelete, aADRead, AadResponse } from "../../api";
import RigSyncEntityLoadError from
  "../../components/errors/RigSyncEntityLoadError";
import UpdateForm from "../../components/forms/aad/UpdateForm";
import RigSyncDelete from "../../components/RigSyncDelete";
import { returnToAADsLink } from "../../components/links/links";
import RigSyncTitle from "../../components/RigSyncTitle";

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
          link={returnToAADsLink}
        />
      }

      {!error &&
        <>
          <RigSyncTitle title="AAD" link={returnToAADsLink} />

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
                successRedirect={returnToAADsLink.to}
              />
            </>
          }
        </>
      }
    </Stack>
  );
};

export default AAD;