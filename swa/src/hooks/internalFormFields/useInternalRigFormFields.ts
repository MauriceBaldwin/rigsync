import { useState } from "react";
import { RigResponse } from "../../api";

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

  return {
    internalName,
    internalMainCanopyId,
    internalReserveCanopyId,
    internalAadId,
    internalContainerId,
    setInternalName,
    setInternalMainCanopyId,
    setInternalReserveCanopyId,
    setInternalAadId,
    setInternalContainerId,
  };
};

export default useInternalRigFormFields;
