import { useState } from "react";
import {
  AadResponse,
  ContainerResponse,
  MainCanopyResponse,
  ReserveCanopyResponse,
} from "../../../api";

const useInternalKitFormFields = (
  kit?:
    | AadResponse
    | ContainerResponse
    | MainCanopyResponse
    | ReserveCanopyResponse,
) => {
  const [internalManufacturer, setInternalManufacturer] = useState(
    kit?.manufacturer ?? '',
  );

  const [internalModel, setInternalModel] = useState(
    kit?.model ?? '',
  );

  const [internalDescription, setInternalDescription] = useState(
    kit?.description ?? '',
  );

  return {
    internalManufacturer,
    internalModel,
    internalDescription,
    setInternalManufacturer,
    setInternalModel,
    setInternalDescription,
  };
};

export default useInternalKitFormFields;
