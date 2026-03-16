import {
  InputAdornment,
  TextField,
} from "@mui/material";
import KitFormFields from "../kit/FormFields";
import { type CanopyFormFieldsProps } from "./types";

const FormFields = ({
  manufacturer,
  model,
  size,
  description,
  setManufacturer,
  setModel,
  setSize,
  setDescription,
}: CanopyFormFieldsProps) => {
  return (
    <>
      <KitFormFields
        manufacturer={manufacturer}
        model={model}
        description={description}
        setManufacturer={setManufacturer}
        setModel={setModel}
        setDescription={setDescription}
      />

      <TextField
        required
        id="size"
        label="Size"
        type="number"
        slotProps={{
          input: {
            endAdornment:
              <InputAdornment position="end">
                ft{'\u00B2'}
              </InputAdornment>,
          },
        }}
        value={size}
        onChange={(event) => { setSize(event.target.value); }}
      />
    </>
  );
};

export default FormFields;
