import { useState } from "react";
import { AxiosRequestConfig } from "axios";
import {
  Box,
  Button,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { rigCreate, RigResponse } from "../../../api";
import useApi from "../../../hooks/useApi";
import FormFields from "./FormFields";

interface CreateRigFormProps {
  onCreate?: (item: RigResponse) => void;
}

const CreateForm = ({ onCreate }: CreateRigFormProps) => {
  const [name, setName] = useState("");
  const [mainCanopyId, setMainCanopyId] = useState("");
  const [reserveCanopyId, setReserveCanopyId] = useState("");
  const [aadId, setAadId] = useState("");
  const [containerId, setContainerId] = useState("");

  const { isLoading, error, makeRequest } = useApi<RigResponse>();

  const createRig = () => {
    makeRequest(
      (options?: AxiosRequestConfig) =>
        rigCreate(
          {
            name,
            mainCanopyId,
            reserveCanopyId,
            aadId,
            containerId,
          },
          options,
        ),
      onCreate,
    );
  };

  return (
    <Box component="form" autoComplete="off" action={createRig}>
      <Stack alignItems="center">
        <Grid>
          <FormFields
            name={name}
            mainCanopyId={mainCanopyId}
            reserveCanopyId={reserveCanopyId}
            aadId={aadId}
            containerId={containerId}
            setName={setName}
            setMainCanopyId={setMainCanopyId}
            setReserveCanopyId={setReserveCanopyId}
            setAadId={setAadId}
            setContainerId={setContainerId}
          />
        </Grid>


        <Button
          type="submit"
          variant="contained"
          loading={isLoading}
          startIcon={<AddBoxIcon />}
        >
          Create
        </Button>

        {error && (
          <Typography variant="body1" color="error">
            Error: {error}
          </Typography>
        )}
      </Stack>
    </Box>
  );
};

export default CreateForm;
