import { MainCanopyResponse } from "../../api";
import useInternalCanopyFormFields from "./shared/useInternalCanopyFormFields";

const useInternalMainCanopyFormFields = (mainCanopy?: MainCanopyResponse) => {
  const internalCanopyFormFields = useInternalCanopyFormFields(mainCanopy);

  return {
    ...internalCanopyFormFields,
  };
};

export default useInternalMainCanopyFormFields;
