import { useEffect } from "react";
import { useParams } from "react-router";
import { AxiosRequestConfig } from "axios";
import { CircularProgress, Stack } from "@mui/material";
import useApi from "../../hooks/useApi";
import {
  mainCanopyDelete,
  mainCanopyRead,
  MainCanopyResponse,
} from "../../api";
import RigSyncEntityLoadError from
  "../../components/errors/RigSyncEntityLoadError";
import UpdateForm from "../../components/forms/mainCanopy/UpdateForm";
import RigSyncDelete from "../../components/RigSyncDelete";
import { returnToMainCanopiesLink } from "../../components/links/links";
import RigSyncTitle from "../../components/RigSyncTitle";

const MainCanopy = () => {
  const { mainCanopyId } = useParams();

  const {
    response,
    isLoading,
    error,
    makeRequest,
  } = useApi<MainCanopyResponse>();

  useEffect(() => {
    if (mainCanopyId) {
      makeRequest(
        (options?: AxiosRequestConfig) => mainCanopyRead(mainCanopyId, options),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainCanopyId]);

  return (
    <Stack spacing={4} alignItems="baseline">
      {error &&
        <RigSyncEntityLoadError
          error={error}
          entityName="main canopy"
          link={returnToMainCanopiesLink}
        />
      }

      {!error &&
        <>
          <RigSyncTitle title="Main canopy" link={returnToMainCanopiesLink} />

          {isLoading &&
            <CircularProgress />
          }

          {response &&
            <>
              <UpdateForm mainCanopy={response} />
              <RigSyncDelete
                deleteRequest={
                  (options?: AxiosRequestConfig) =>
                    mainCanopyDelete(response.id, options)
                }
                successRedirect={returnToMainCanopiesLink.to}
              />
            </>
          }
        </>
      }
    </Stack>
  );
};

export default MainCanopy;
