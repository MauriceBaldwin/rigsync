import { useState } from "react";
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

const CreateMainCanopyForm = () => {
  const [internalManufacturer, setInternalManufacturer] = useState('');
  const [internalModel, setInternalModel] = useState('');
  const [internalSize, setInternalSize] = useState('');

  const { isLoading, error, makeRequest } =
    useApi<MainCanopyResponse>();

  const createMainCanopy = () => {
    makeRequest(() =>
      mainCanopyCreate({
        manufacturer: internalManufacturer,
        model: internalModel,
        size: parseInt(internalSize),
      }));
  };

  return (
    <Box
      component="form"
      autoComplete="off"
      action={createMainCanopy}
    >
      <Stack alignItems="center">
        <Stack direction="row" alignItems="center" spacing={{ xs: 0, sm: 1 }}>
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