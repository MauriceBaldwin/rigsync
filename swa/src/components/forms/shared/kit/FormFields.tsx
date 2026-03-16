import { TextField } from "@mui/material";
import { type KitFormFieldsProps } from "./types";

const FormFields = ({
  manufacturer,
  model,
  description,
  setManufacturer,
  setModel,
  setDescription,
}: KitFormFieldsProps) => {
  return (
    <>
      <TextField
        required
        id="manufacturer"
        label="Manufacturer"
        value={manufacturer}
        onChange={(event) => { setManufacturer(event.target.value); }}
      />

      <TextField
        required
        id="model"
        label="Model"
        value={model}
        onChange={(event) => { setModel(event.target.value); }}
      />

      <TextField
        id="description"
        label="Description"
        value={description}
        onChange={(event) => { setDescription(event.target.value); }}
      />
    </>
  );
};

export default FormFields;
