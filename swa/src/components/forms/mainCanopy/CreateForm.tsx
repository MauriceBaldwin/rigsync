import { useState } from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { mainCanopyCreate, MainCanopyResponse } from "../../../api";
import useApi from "../../../hooks/useApi";
import FormFields from "./FormFields";

interface CreateMainCanopyFormProps {
  onCreate?: (item: MainCanopyResponse) => void;
}

const CreateForm = ({ onCreate }: CreateMainCanopyFormProps) => {
  const [internalManufacturer, setInternalManufacturer] = useState('');
  const [internalModel, setInternalModel] = useState('');
  const [internalSize, setInternalSize] = useState('');

  const { isLoading, error, makeRequest } =
    useApi<MainCanopyResponse>();

  const createMainCanopy = () => {
    makeRequest(
      () => mainCanopyCreate({
        manufacturer: internalManufacturer,
        model: internalModel,
        size: parseInt(internalSize),
      }),
      onCreate,
    );
  };

  return (
    <Box
      component="form"
      autoComplete="off"
      action={createMainCanopy}
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
            setManufacturer={setInternalManufacturer}
            setModel={setInternalModel}
            setSize={setInternalSize}
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