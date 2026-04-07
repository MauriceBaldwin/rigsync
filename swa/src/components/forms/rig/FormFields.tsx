import { TextField } from "@mui/material";
import RigSyncSelectFromApi from "../../RigSyncSelectFromApi";
import {
  formatAadWithDescription,
  formatContainerWithDescription,
  formatMainCanopyWithDescription,
  formatReserveCanopyWithDescription,
} from "../../utils/formatters";
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
  rigId?: string | null
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

const isOptionDisabled = (
  item:
    | MainCanopyResponse
    | ReserveCanopyResponse
    | AadResponse
    | ContainerResponse,
  rigId?: string | null,
) => {
  // disabled if the item has a rig that isn't the current rig
  return !!item.rig && (item.rig.id !== rigId);
};

const FormFields = ({
  rigId,
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
        renderOption={(main) => formatMainCanopyWithDescription(main)}
        isOptionDisabled={(main) => isOptionDisabled(main, rigId)}
      />

      <RigSyncSelectFromApi<ReserveCanopyResponse, string>
        label="Reserve canopy"
        value={reserveCanopyId}
        setValue={setReserveCanopyId}
        listRequest={reserveCanopyList}
        getKey={(reserve) => reserve.id}
        renderOption={(reserve) => formatReserveCanopyWithDescription(reserve)}
        isOptionDisabled={(reserve) => isOptionDisabled(reserve, rigId)}
      />

      <RigSyncSelectFromApi<AadResponse, string>
        label="AAD"
        value={aadId}
        setValue={setAadId}
        listRequest={aADList}
        getKey={(aad: AadResponse) => aad.id}
        renderOption={(aad: AadResponse) => formatAadWithDescription(aad)}
        isOptionDisabled={(aad) => isOptionDisabled(aad, rigId)}
      />

      <RigSyncSelectFromApi<ContainerResponse, string>
        label="Container"
        value={containerId}
        setValue={setContainerId}
        listRequest={containerList}
        getKey={(container: ContainerResponse) => container.id}
        renderOption={
          (container: ContainerResponse) =>
            formatContainerWithDescription(container)
        }
        isOptionDisabled={(container) => isOptionDisabled(container, rigId)}
      />
    </>
  );
};

export default FormFields;
