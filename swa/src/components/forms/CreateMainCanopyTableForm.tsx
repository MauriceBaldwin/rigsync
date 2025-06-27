import { useState } from "react";
import {
  IconButton,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import CreateMainCanopyForm from "./CreateMainCanopyForm";
import { MainCanopyResponse } from "../../api";

interface CreateMainCanopyTableFormProps {
  columnCount: number
  onCreate?: (item: MainCanopyResponse) => void
}

const CreateMainCanopyTableForm = ({
  columnCount,
  onCreate,
}: CreateMainCanopyTableFormProps) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCreate = (item: MainCanopyResponse) => {
    setIsFormOpen(false);
    setShowSuccess(true);

    if (onCreate) {
      onCreate(item);
    }

    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  return (
    <TableRow>
      <TableCell align="center" colSpan={columnCount}>
        {!isFormOpen && !showSuccess &&
          <IconButton
            color="primary"
            aria-label="Add main canopy"
            onClick={() => { setIsFormOpen(true); }}
          >
            <AddIcon />
          </IconButton>
        }
        {isFormOpen &&
          <Stack alignItems="center">
            <CreateMainCanopyForm onCreate={handleCreate} />
            <IconButton
              aria-label="Cancel"
              onClick={() => { setIsFormOpen(false); }}
            >
              <CloseIcon />
            </IconButton>
          </Stack>
        }
        {showSuccess &&
          <Stack justifyContent="center" direction="row" spacing={2}>
            <DoneIcon color="success" />
            <Typography variant="body1" color="success">
              Main canopy created
            </Typography>
          </Stack>
        }
      </TableCell>
    </TableRow>
  );
};

export default CreateMainCanopyTableForm;