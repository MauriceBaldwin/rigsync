import {
  TextField,
} from "@mui/material";

interface AADFormFieldsProps {
  manufacturer: string;
  model: string;
  setManufacturer: (manufacturer: string) => void;
  setModel: (model: string) => void;
}

const FormFields = ({
  manufacturer,
  model,
  setManufacturer,
  setModel,
}: AADFormFieldsProps) => {
  return (
    <>
      <TextField
        required
        id="create-container-manufacturer"
        label="Manufacturer"
        placeholder="Upt"
        value={manufacturer}
        onChange={(event) => { setManufacturer(event.target.value); }}
      />

      <TextField
        required
        id="create-container-model"
        label="Model"
        placeholder="Vector"
        value={model}
        onChange={(event) => { setModel(event.target.value); }}
      />
    </>
  );
};

export default FormFields;
