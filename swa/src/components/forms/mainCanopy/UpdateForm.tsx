import { AxiosRequestConfig } from "axios";
import {
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { MainCanopyResponse, mainCanopyUpdate } from "../../../api";
import useApi from "../../../hooks/useApi";
import FormFields from "../shared/canopy/FormFields";
import RigSyncSuccess from "../../RigSyncSuccess";
import useInternalMainCanopyFormFields from
  "../../../hooks/internalFormFields/useInternalMainCanopyFormFields";

interface UpdateMainCanopyFormProps {
  mainCanopy: MainCanopyResponse
}

const UpdateForm = ({ mainCanopy }: UpdateMainCanopyFormProps) => {
  const {
    internalManufacturer,
    internalModel,
    internalSize,
    internalDescription,
    setInternalManufacturer,
    setInternalModel,
    setInternalSize,
    setInternalDescription,
  } = useInternalMainCanopyFormFields(mainCanopy);

  const { isLoading, error, showSuccess, makeRequest } =
    useApi<MainCanopyResponse>();

  const updateMainCanopy = () => {
    makeRequest(
      (options?: AxiosRequestConfig) => mainCanopyUpdate(
        mainCanopy.id,
        {
          manufacturer: internalManufacturer,
          model: internalModel,
          size: parseInt(internalSize),
          description: internalDescription,
        },
        options,
      ));
  };

  return (
    <Box
      component="form"
      autoComplete="off"
      action={updateMainCanopy}
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
          <RigSyncSuccess message="Main canopy updated" />
        }
      </Stack>
    </Box>

  );
};

export default UpdateForm;