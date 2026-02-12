import { useState } from "react";
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
import FormFields from "./FormFields";
import RigSyncSuccess from "../../RigSyncSuccess";

interface UpdateReserveCanopyFormProps {
  reserveCanopy: ReserveCanopyResponse;
}

const UpdateForm = ({ reserveCanopy }: UpdateReserveCanopyFormProps) => {
  const [
    internalManufacturer,
    setInternalManufacturer,
  ] = useState(reserveCanopy.manufacturer);

  const [
    internalModel,
    setInternalModel,
  ] = useState(reserveCanopy.model);

  const [
    internalSize,
    setInternalSize,
  ] = useState(reserveCanopy.size.toString());

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
            setManufacturer={setInternalManufacturer}
            setModel={setInternalModel}
            setSize={setInternalSize}
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
