import { useParams } from "react-router";
import useApi from "../../hooks/useApi";
import { mainCanopyRead, MainCanopyResponse } from "../../api";
import { useEffect } from "react";
import { CircularProgress, Container, Stack, Typography } from "@mui/material";
import RigSyncEntityLoadError from
  "../../components/errors/RigSyncEntityLoadError";
import RigSyncPageLink from "../../components/RigSyncPageLink";
import UpdateForm from "../../components/forms/mainCanopy/UpdateForm";

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
    if (mainCanopyId) makeRequest(() => mainCanopyRead(mainCanopyId));
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
            <RigSyncPageLink
              to={returnLink.to}
              title={returnLink.title}
              isReturn={returnLink.isReturn}
            />
          </Container>

          {isLoading &&
            <CircularProgress />
          }

          {response &&
            <UpdateForm
              mainCanopy={response}
            />
          }
        </>
      }
    </Stack>
  );
};

export default MainCanopy;