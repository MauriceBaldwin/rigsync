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
  mainCanopyDelete,
  mainCanopyRead,
  MainCanopyResponse,
} from "../../api";
import RigSyncEntityLoadError from
  "../../components/errors/RigSyncEntityLoadError";
import RigSyncPageLink from "../../components/RigSyncPageLink";
import UpdateForm from "../../components/forms/mainCanopy/UpdateForm";
import RigSyncDelete from "../../components/RigSyncDelete";

const returnLink = {
  to: '/main-canopies',
  title: 'Return to main canopies',
  isReturn: true,
};

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
          link={returnLink}
        />
      }

      {!error &&
        <>
          <Container disableGutters >
            <Typography variant="h1" color="primary">Main canopy</Typography>
            <RigSyncPageLink link={returnLink} />
          </Container>

          {isLoading &&
            <CircularProgress />
          }

          {response &&
            <>
              <UpdateForm mainCanopy={response} />
              <RigSyncDelete
                deleteRequest={() => mainCanopyDelete(response.id)}
                successRedirect={returnLink.to}
              />
            </>
          }
        </>
      }
    </Stack>
  );
};

export default MainCanopy;