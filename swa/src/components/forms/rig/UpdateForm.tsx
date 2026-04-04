import { AxiosRequestConfig } from "axios";
import {
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { RigResponse, rigUpdate } from "../../../api";
import useApi from "../../../hooks/useApi";
import FormFields from "./FormFields";
import RigSyncSuccess from "../../RigSyncSuccess";
import useInternalRigFormFields from
  "../../../hooks/internalFormFields/useInternalRigFormFields";
import { DatePicker } from "@mui/x-date-pickers";
import { dayJsToDateRequest } from "../../../api/utils";

interface Props {
  rig: RigResponse;
}

const UpdateForm = ({ rig }: Props) => {
  const {
    internalName,
    internalMainCanopyId,
    internalReserveCanopyId,
    internalAadId,
    internalContainerId,
    internalNextReserveRepackDue,
    setInternalName,
    setInternalMainCanopyId,
    setInternalReserveCanopyId,
    setInternalAadId,
    setInternalContainerId,
    setInternalNextReserveRepackDue,
  } = useInternalRigFormFields(rig);

  const { isLoading, error, showSuccess, makeRequest } = useApi<RigResponse>();

  const updateRig = () => {
    makeRequest(
      (options?: AxiosRequestConfig) => rigUpdate(
        rig.id,
        {
          name: internalName,
          mainCanopyId: internalMainCanopyId,
          reserveCanopyId: internalReserveCanopyId,
          aadId: internalAadId,
          containerId: internalContainerId,
          nextReserveRepackDue: dayJsToDateRequest(
            internalNextReserveRepackDue,
          ),
        },
        options,
      ));
  };

  return (
    <Box
      component="form"
      autoComplete="off"
      action={updateRig}
      width="100%"
    >
      <Stack alignItems="center" spacing={1}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "stretch", sm: "center" }}
          spacing={1}
        >
          <FormFields
            rigId={rig.id}
            name={internalName}
            mainCanopyId={internalMainCanopyId}
            reserveCanopyId={internalReserveCanopyId}
            aadId={internalAadId}
            containerId={internalContainerId}
            setName={setInternalName}
            setMainCanopyId={setInternalMainCanopyId}
            setReserveCanopyId={setInternalReserveCanopyId}
            setAadId={setInternalAadId}
            setContainerId={setInternalContainerId}
          />
          <DatePicker
            label="Reserve repack due date"
            value={internalNextReserveRepackDue}
            onChange={setInternalNextReserveRepackDue}
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
