import { IconButton, Stack, TableCell, TableRow } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import CreateMainCanopyForm from "./CreateMainCanopyForm";
import { useState } from "react";

interface CreateMainCanopyTableFormProps {
  columnCount: number
}

const CreateMainCanopyTableForm = ({
  columnCount,
}: CreateMainCanopyTableFormProps) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <TableRow>
      {!isFormOpen &&
        <TableCell align="center" colSpan={columnCount}>
          <IconButton
            color="primary"
            aria-label="Add main canopy"
            onClick={() => { setIsFormOpen(true); }}
          >
            <AddIcon />
          </IconButton>
        </TableCell>
      }
      {isFormOpen &&
        <TableCell align="center" colSpan={columnCount}>
          <Stack alignItems="center">
            <CreateMainCanopyForm />
            <IconButton
              aria-label="Cancel"
              onClick={() => { setIsFormOpen(false); }}
            >
              <CloseIcon />
            </IconButton>
          </Stack>
        </TableCell>
      }
    </TableRow>
  );
};

export default CreateMainCanopyTableForm;