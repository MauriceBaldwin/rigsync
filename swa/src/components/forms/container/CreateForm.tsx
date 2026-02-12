import { useState } from "react";
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
import FormFields from "./FormFields";

interface CreateContainerFormProps {
  onCreate?: (item: ContainerResponse) => void;
}

const CreateForm = ({ onCreate }: CreateContainerFormProps) => {
  const [internalManufacturer, setInternalManufacturer] = useState('');
  const [internalModel, setInternalModel] = useState('');

  const { isLoading, error, makeRequest } =
    useApi<ContainerResponse>();

  const createContainer = () => {
    makeRequest(
      (options?: AxiosRequestConfig) => containerCreate(
        {
          manufacturer: internalManufacturer,
          model: internalModel,
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
            setManufacturer={setInternalManufacturer}
            setModel={setInternalModel}
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
