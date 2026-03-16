import { AxiosRequestConfig } from "axios";
import {
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { ReserveCanopyResponse, reserveCanopyCreate } from '../../../api';
import useApi from '../../../hooks/useApi';
import FormFields from "../shared/canopy/FormFields";
import useInternalReserveCanopyFormFields from
  "../../../hooks/internalFormFields/useInternalReserveCanopyFormFields";

interface CreateReserveCanopyFormProps {
  onCreate?: (item: ReserveCanopyResponse) => void;
}

const CreateForm = ({ onCreate }: CreateReserveCanopyFormProps) => {
  const {
    internalManufacturer,
    internalModel,
    internalSize,
    internalDescription,
    setInternalManufacturer,
    setInternalModel,
    setInternalSize,
    setInternalDescription,
  } = useInternalReserveCanopyFormFields();

  const { isLoading, error, makeRequest } = useApi<ReserveCanopyResponse>();

  const createReserveCanopy = () => {
    makeRequest(
      (options?: AxiosRequestConfig) => reserveCanopyCreate(
        {
          manufacturer: internalManufacturer,
          model: internalModel,
          size: parseInt(internalSize),
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
      action={createReserveCanopy}
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
            size={internalSize}
            description={internalDescription}
            setManufacturer={setInternalManufacturer}
            setModel={setInternalModel}
            setSize={setInternalSize}
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
