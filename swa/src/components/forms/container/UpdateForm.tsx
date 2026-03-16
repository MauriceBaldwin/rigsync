import { AxiosRequestConfig } from "axios";
import {
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { containerUpdate, ContainerResponse } from "../../../api";
import useApi from "../../../hooks/useApi";
import FormFields from "../shared/kit/FormFields";
import RigSyncSuccess from "../../RigSyncSuccess";
import useInternalContainerFormFields from
  "../../../hooks/internalFormFields/useInternalContainerFormFields";

interface UpdateContainerFormProps {
  container: ContainerResponse;
}

const UpdateForm = ({ container }: UpdateContainerFormProps) => {
  const {
    internalManufacturer,
    internalModel,
    internalDescription,
    setInternalManufacturer,
    setInternalModel,
    setInternalDescription,
  } = useInternalContainerFormFields(container);

  const {
    isLoading,
    error,
    showSuccess,
    makeRequest,
  } = useApi<ContainerResponse>();

  const updateContainer = () => {
    makeRequest(
      (options?: AxiosRequestConfig) => containerUpdate(
        container.id,
        {
          manufacturer: internalManufacturer,
          model: internalModel,
          description: internalDescription,
        },
        options,
      ),
    );
  };

  return (
    <Box
      component="form"
      autoComplete="off"
      action={updateContainer}
      width="100%"
    >
      <Stack alignItems="center" spacing={1}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "stretch", sm: "center" }}
          spacing={1}
        >
          <FormFields
            manufacturer={internalManufacturer}
            model={internalModel}
            description={internalDescription}
            setManufacturer={setInternalManufacturer}
            setModel={setInternalModel}
            setDescription={setInternalDescription}
          />
        </Stack>
        <Button
          type="submit"
          variant="contained"
          loading={isLoading}
          startIcon={<EditIcon />}
        >
          Update
        </Button>
        {error &&
          <Typography variant="body1" color="error">
            Error: {error}
          </Typography>
        }
        {showSuccess &&
          <RigSyncSuccess message="Container updated" />
        }
      </Stack>
    </Box>
  );
};

export default UpdateForm;
