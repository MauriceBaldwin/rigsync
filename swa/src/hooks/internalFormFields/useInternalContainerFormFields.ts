import { ContainerResponse } from "../../api";
import useInternalKitFormFields from "./shared/useInternalKitFormFields";

const useInternalContainerFormFields = (container?: ContainerResponse) => {
  const internalKitFormFields = useInternalKitFormFields(container);

  return {
    ...internalKitFormFields,
  };
};

export default useInternalContainerFormFields;
