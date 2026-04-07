import { useState } from "react";
import { RigResponse } from "../../api";
import { dateResponseToDayJs } from "../../api/utils";

const useInternalRigFormFields = (rig?: RigResponse) => {
  const [internalName, setInternalName] = useState(rig?.name ?? "");

  const [
    internalMainCanopyId,
    setInternalMainCanopyId,
  ] = useState(rig?.mainCanopy.id ?? "");

  const [
    internalReserveCanopyId,
    setInternalReserveCanopyId,
  ] = useState(rig?.reserveCanopy.id ?? "");

  const [
    internalAadId,
    setInternalAadId,
  ] = useState(rig?.aad.id ?? "");

  const [
    internalContainerId,
    setInternalContainerId,
  ] = useState(rig?.container.id ?? "");

  const [
    internalNextReserveRepackDue,
    setInternalNextReserveRepackDue,
  ] = useState(dateResponseToDayJs(rig?.nextReserveRepackDue) ?? null);

  return {
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
  };
};

export default useInternalRigFormFields;
