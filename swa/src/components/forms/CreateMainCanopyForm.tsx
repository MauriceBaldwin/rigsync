import { useEffect, useState } from "react";
import {
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { mainCanopyCreate, MainCanopyResponse } from "../../api";
import useApi from "../../hooks/useApi";

interface CreateMainCanopyFormProps {
  onCreate?: (item: MainCanopyResponse) => void;
}

const CreateMainCanopyForm = ({ onCreate }: CreateMainCanopyFormProps) => {
  const [internalManufacturer, setInternalManufacturer] = useState('');
  const [internalModel, setInternalModel] = useState('');
  const [internalSize, setInternalSize] = useState('');

  const { response, isLoading, error, makeRequest } =
    useApi<MainCanopyResponse>();

  const createMainCanopy = () => {
    makeRequest(() =>
      mainCanopyCreate({
        manufacturer: internalManufacturer,
        model: internalModel,
        size: parseInt(internalSize),
      }));
  };

  useEffect(() => {
    if (response && !error && onCreate) {
      onCreate(response);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, error]);

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
          <TextField
            required
            id="create-main-canopy-manufacturer"
            label="Manufacturer"
            placeholder="Performance Designs"
            value={internalManufacturer}
            onChange={(event) => {
              setInternalManufacturer(event.target.value);
            }}
          />
          <TextField
            required
            id="create-main-canopy-model"
            label="Model"
            placeholder="Sabre3"
            value={internalModel}
            onChange={(event) => { setInternalModel(event.target.value); }}
          />
          <TextField
            required
            id="create-main-canopy-size"
            label="Size"
            type="number"
            placeholder="120"
            slotProps={{
              input: {
                endAdornment:
                  <InputAdornment position="end">
                    ft{'\u00B2'}
                  </InputAdornment>,
              },
            }}
            value={internalSize}
            onChange={(event) => { setInternalSize(event.target.value); }}
          />

          <Button
            type="submit"
            variant="contained"
            loading={isLoading}
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

export default CreateMainCanopyForm;