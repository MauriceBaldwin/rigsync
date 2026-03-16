import { ReserveCanopyResponse } from "../../api";
import useInternalCanopyFormFields from "./shared/useInternalCanopyFormFields";

const useInternalReserveCanopyFormFields = (
  reserveCanopy?: ReserveCanopyResponse,
) => {
  const internalCanopyFormFields = useInternalCanopyFormFields(reserveCanopy);

  return {
    ...internalCanopyFormFields,
  };
};

export default useInternalReserveCanopyFormFields;
