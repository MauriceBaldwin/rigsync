import { useState } from "react";
import useInternalKitFormFields from "./useInternalKitFormFields";
import { MainCanopyResponse, ReserveCanopyResponse } from "../../../api";

const useInternalCanopyFormFields = (
  canopy?: MainCanopyResponse | ReserveCanopyResponse,
) => {
  const kitInternalFormFields = useInternalKitFormFields(canopy);

  const [internalSize, setInternalSize] = useState(
    canopy?.size.toString() ?? '',
  );

  return {
    ...kitInternalFormFields,
    internalSize,
    setInternalSize,
  };
};

export default useInternalCanopyFormFields;
