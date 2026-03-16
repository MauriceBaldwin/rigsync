import { AxiosRequestConfig } from "axios";
import {
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { AadResponse, aADUpdate } from "../../../api";
import useApi from "../../../hooks/useApi";
import FormFields from "../shared/kit/FormFields";
import RigSyncSuccess from "../../RigSyncSuccess";
import useInternalAadFormFields from
  "../../../hooks/internalFormFields/useInternalAadFormFields";

interface UpdateAADFormProps {
  aad: AadResponse
}

const UpdateForm = ({ aad }: UpdateAADFormProps) => {
  const {
    internalManufacturer,
    internalModel,
    internalDescription,
    setInternalManufacturer,
    setInternalModel,
    setInternalDescription,
  } = useInternalAadFormFields(aad);

  const { isLoading, error, showSuccess, makeRequest } =
    useApi<AadResponse>();

  const updateAAD = () => {
    makeRequest(
      (options?: AxiosRequestConfig) => aADUpdate(
        aad.id,
        {
          manufacturer: internalManufacturer,
          model: internalModel,
          description: internalDescription,
        },
        options,
      ));
  };

  return (
    <Box
      component="form"
      autoComplete="off"
      action={updateAAD}
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
          <RigSyncSuccess message="AAD updated" />
        }
      </Stack>
    </Box>

  );
};

export default UpdateForm;