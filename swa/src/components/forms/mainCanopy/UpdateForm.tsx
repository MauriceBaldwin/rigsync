import { useState } from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import { MainCanopyResponse, mainCanopyUpdate } from "../../../api";
import useApi from "../../../hooks/useApi";
import FormFields from "./FormFields";
import RigSyncSuccess from "../../RigSyncSuccess";

interface UpdateMainCanopyFormProps {
  mainCanopy: MainCanopyResponse
}

const UpdateForm = ({ mainCanopy }: UpdateMainCanopyFormProps) => {
  const [internalManufacturer, setInternalManufacturer] =
    useState(mainCanopy.manufacturer);
  const [internalModel, setInternalModel] = useState(mainCanopy.model);
  const [internalSize, setInternalSize] = useState(mainCanopy.size.toString());

  const { isLoading, error, showSuccess, makeRequest } =
    useApi<MainCanopyResponse>();

  const updateMainCanopy = () => {
    makeRequest(() =>
      mainCanopyUpdate(mainCanopy.id, {
        manufacturer: internalManufacturer,
        model: internalModel,
        size: parseInt(internalSize),
      }));
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
            setManufacturer={setInternalManufacturer}
            setModel={setInternalModel}
            setSize={setInternalSize}
          />
        </Stack>
        <Button
          type="submit"
          variant="contained"
          loading={isLoading}
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