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
  containerDelete,
  containerRead,
  ContainerResponse,
} from "../../api";
import RigSyncEntityLoadError from
  "../../components/errors/RigSyncEntityLoadError";
import RigSyncPageLink from "../../components/RigSyncPageLink";
import UpdateForm from "../../components/forms/container/UpdateForm";
import RigSyncDelete from "../../components/RigSyncDelete";

const returnLink = {
  to: '/containers',
  title: 'Return to containers',
  isReturn: true,
};

const ContainerPage = () => {
  const { containerId } = useParams();

  const {
    response,
    isLoading,
    error,
    makeRequest,
  } = useApi<ContainerResponse>();

  useEffect(() => {
    if (containerId) {
      makeRequest(
        (options?: AxiosRequestConfig) => containerRead(containerId, options),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerId]);

  return (
    <Stack spacing={4} alignItems="baseline">
      {error &&
        <RigSyncEntityLoadError
          error={error}
          entityName="container"
          link={returnLink}
        />
      }

      {!error &&
        <>
          <Container disableGutters >
            <Typography variant="h1" color="primary">Container</Typography>
            <RigSyncPageLink link={returnLink} />
          </Container>

          {isLoading &&
            <CircularProgress />
          }

          {response &&
            <>
              <UpdateForm container={response} />
              <RigSyncDelete
                deleteRequest={
                  (options?: AxiosRequestConfig) =>
                    containerDelete(response.id, options)
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

export default ContainerPage;
