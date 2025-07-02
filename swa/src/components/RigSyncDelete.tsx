import { Button, Stack, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import useApi, { type Request } from "../hooks/useApi";
import { useEffect } from "react";
import { useNavigate } from "react-router";

interface RigSyncDeleteProps {
  deleteRequest: Request<void>
  successRedirect?: string
}

const RigSyncDelete = ({
  deleteRequest,
  successRedirect,
}: RigSyncDeleteProps) => {
  const navigate = useNavigate();

  const { makeRequest, isLoading, error, showSuccess } = useApi();

  const makeDeleteRequest = () => {
    makeRequest(deleteRequest);
  };

  useEffect(() => {
    if (showSuccess && successRedirect) void navigate(successRedirect);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showSuccess]);

  return (<Stack
    sx={{ width: "100%" }}
    direction="row"
    spacing={1}
    alignItems="center"
    justifyContent="flex-end"
  >
    {error &&
      <Typography color="error">
        Error: {error}
      </Typography>
    }

    <Button
      variant="outlined"
      color="warning"
      startIcon={<DeleteIcon />}
      loading={isLoading}
      onClick={makeDeleteRequest}
    >
      Delete
    </Button>
  </Stack>);
};

export default RigSyncDelete;