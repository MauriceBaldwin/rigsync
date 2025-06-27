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
      <Stack spacing={4}>

        <Stack direction="row" spacing={4}>
          <TextField
            required
            id="create-main-canopy-manufacturer"
            label="Manufacturer"
            helperText="Name of the canopy manufacturer"
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
            helperText="Name of the canopy model"
            placeholder="Sabre3"
            value={internalModel}
            onChange={(event) => { setInternalModel(event.target.value); }}
          />
          <TextField
            required
            id="create-main-canopy-size"
            label="Size"
            type="number"
            helperText="Size of the canopy in square feet"
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
        </Stack>

        <Stack direction="row" alignItems="center" spacing={4}>
          <Button
            type="submit"
            variant="contained"
            loading={isLoading}
          >
            Create
          </Button>

          {error &&
            <Typography variant="body1" color="error">
              Error: {error}
            </Typography>
          }

        </Stack>
      </Stack>
    </Box>

  );
};

export default CreateMainCanopyForm;