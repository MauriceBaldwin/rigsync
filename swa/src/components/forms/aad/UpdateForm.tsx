import { useState } from "react";
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
import FormFields from "./FormFields";
import RigSyncSuccess from "../../RigSyncSuccess";

interface UpdateAADFormProps {
  aad: AadResponse
}

const UpdateForm = ({ aad }: UpdateAADFormProps) => {
  const [internalManufacturer, setInternalManufacturer] =
    useState(aad.manufacturer);
  const [internalModel, setInternalModel] = useState(aad.model);

  const { isLoading, error, showSuccess, makeRequest } =
    useApi<AadResponse>();

  const updateAAD = () => {
    makeRequest(
      (options?: AxiosRequestConfig) => aADUpdate(
        aad.id,
        {
          manufacturer: internalManufacturer,
          model: internalModel,
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
            setManufacturer={setInternalManufacturer}
            setModel={setInternalModel}
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