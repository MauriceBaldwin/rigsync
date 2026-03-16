import { AxiosRequestConfig } from "axios";
import {
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { ReserveCanopyResponse, reserveCanopyUpdate } from "../../../api";
import useApi from "../../../hooks/useApi";
import FormFields from "../shared/canopy/FormFields";
import RigSyncSuccess from "../../RigSyncSuccess";
import useInternalReserveCanopyFormFields from
  "../../../hooks/internalFormFields/useInternalReserveCanopyFormFields";

interface UpdateReserveCanopyFormProps {
  reserveCanopy: ReserveCanopyResponse;
}

const UpdateForm = ({ reserveCanopy }: UpdateReserveCanopyFormProps) => {
  const {
    internalManufacturer,
    internalModel,
    internalSize,
    internalDescription,
    setInternalManufacturer,
    setInternalModel,
    setInternalSize,
    setInternalDescription,
  } = useInternalReserveCanopyFormFields(reserveCanopy);

  const {
    isLoading,
    error,
    showSuccess,
    makeRequest,
  } = useApi<ReserveCanopyResponse>();

  const updateReserveCanopy = () => {
    makeRequest(
      (options?: AxiosRequestConfig) => reserveCanopyUpdate(
        reserveCanopy.id,
        {
          manufacturer: internalManufacturer,
          model: internalModel,
          size: parseInt(internalSize),
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
      action={updateReserveCanopy}
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
            size={internalSize}
            description={internalDescription}
            setManufacturer={setInternalManufacturer}
            setModel={setInternalModel}
            setSize={setInternalSize}
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
          <RigSyncSuccess message="Reserve canopy updated" />
        }
      </Stack>
    </Box>
  );
};

export default UpdateForm;
