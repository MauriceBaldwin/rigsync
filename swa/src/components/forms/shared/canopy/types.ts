import { type KitFormFieldsProps } from "../kit/types";

export interface CanopyFormFieldsProps extends KitFormFieldsProps {
  size: string
  setSize: (size: string) => void
}
