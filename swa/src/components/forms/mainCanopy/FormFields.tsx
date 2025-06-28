import {
  InputAdornment,
  TextField,
} from "@mui/material";

interface MainCanopyFormFieldsProps {
  manufacturer: string
  model: string
  size: string
  setManufacturer: (manufacturer: string) => void
  setModel: (model: string) => void
  setSize: (size: string) => void
}

const FormFields = ({
  manufacturer,
  model,
  size,
  setManufacturer,
  setModel,
  setSize,
}: MainCanopyFormFieldsProps) => {
  return (
    <>
      <TextField
        required
        id="create-main-canopy-manufacturer"
        label="Manufacturer"
        placeholder="Performance Designs"
        value={manufacturer}
        onChange={(event) => {
          setManufacturer(event.target.value);
        }}
      />

      <TextField
        required
        id="create-main-canopy-model"
        label="Model"
        placeholder="Sabre3"
        value={model}
        onChange={(event) => { setModel(event.target.value); }}
      />

      <TextField
        required
        id="create-main-canopy-size"
        label="Size"
        type="number"
        placeholder="120"
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