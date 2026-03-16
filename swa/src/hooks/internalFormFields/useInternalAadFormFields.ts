import { AadResponse } from "../../api";
import useInternalKitFormFields from "./shared/useInternalKitFormFields";

const useInternalAadFormFields = (aad?: AadResponse) => {
  const internalKitFormFields = useInternalKitFormFields(aad);

  return {
    ...internalKitFormFields,
  };
};

export default useInternalAadFormFields;
