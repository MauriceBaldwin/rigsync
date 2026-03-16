import { AxiosRequestConfig } from "axios";
import {
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { containerCreate, ContainerResponse } from "../../../api";
import useApi from "../../../hooks/useApi";
import FormFields from "../shared/kit/FormFields";
import useInternalContainerFormFields from
  "../../../hooks/internalFormFields/useInternalContainerFormFields";

interface CreateContainerFormProps {
  onCreate?: (item: ContainerResponse) => void;
}

const CreateForm = ({ onCreate }: CreateContainerFormProps) => {
  const {
    internalManufacturer,
    internalModel,
    internalDescription,
    setInternalManufacturer,
    setInternalModel,
    setInternalDescription,
  } = useInternalContainerFormFields();

  const { isLoading, error, makeRequest } =
    useApi<ContainerResponse>();

  const createContainer = () => {
    makeRequest(
      (options?: AxiosRequestConfig) => containerCreate(
        {
          manufacturer: internalManufacturer,
          model: internalModel,
          description: internalDescription,
        },
        options,
      ),
      onCreate,
    );
  };

  return (
    <Box
      component="form"
      autoComplete="off"
      action={createContainer}
    >
      <Stack alignItems="center">
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

          <Button
            type="submit"
            variant="contained"
            loading={isLoading}
            startIcon={<AddBoxIcon />}
          >
            Create
          </Button>
        </Stack>

        {error &&
          <Typography variant="body1" color="error">
            Error: {error}
          </Typography>
        }
      </Stack>
    </Box>
  );
};

export default CreateForm;
