import { TextField } from "@mui/material";
import RigSyncSelectFromApi from "../../RigSyncSelectFromApi";
import {
  mainCanopyList,
  MainCanopyResponse,
  reserveCanopyList,
  ReserveCanopyResponse,
  aADList,
  AadResponse,
  containerList,
  ContainerResponse,
} from "../../../api";

interface RigFormFieldsProps {
  name: string;
  mainCanopyId: string;
  reserveCanopyId: string;
  aadId: string;
  containerId: string;
  setName: (name: string) => void;
  setMainCanopyId: (mainCanopyId: string) => void;
  setReserveCanopyId: (reserveCanopyId: string) => void;
  setAadId: (aadId: string) => void;
  setContainerId: (containerId: string) => void;
}

const FormFields = ({
  name,
  mainCanopyId,
  reserveCanopyId,
  aadId,
  containerId,
  setName,
  setMainCanopyId,
  setReserveCanopyId,
  setAadId,
  setContainerId,
}: RigFormFieldsProps) => {
  return (
    <>
      <TextField
        required
        id="rig-name"
        label="Name"
        placeholder="Name"
        value={name}
        onChange={(event) => { setName(event.target.value); }}
      />

      <RigSyncSelectFromApi<MainCanopyResponse, string>
        label="Main canopy"
        value={mainCanopyId}
        setValue={setMainCanopyId}
        listRequest={mainCanopyList}
        getKey={(main) => main.id}
        renderOption={(main) => `${main.model} ${main.size.toString()}`}
      />

      <RigSyncSelectFromApi<ReserveCanopyResponse, string>
        label="Reserve canopy"
        value={reserveCanopyId}
        setValue={setReserveCanopyId}
        listRequest={reserveCanopyList}
        getKey={(reserve) => reserve.id}
        renderOption={(reserv) => `${reserv.model} ${reserv.size.toString()}`}
      />

      <RigSyncSelectFromApi<AadResponse, string>
        label="AAD"
        value={aadId}
        setValue={setAadId}
        listRequest={aADList}
        getKey={(aad: AadResponse) => aad.id}
        renderOption={(aad: AadResponse) => `${aad.manufacturer} ${aad.model}`}
      />

      <RigSyncSelectFromApi<ContainerResponse, string>
        label="Container"
        value={containerId}
        setValue={setContainerId}
        listRequest={containerList}
        getKey={(container: ContainerResponse) => container.id}
        renderOption={(container: ContainerResponse) => container.model}
      />
    </>
  );
};

export default FormFields;
