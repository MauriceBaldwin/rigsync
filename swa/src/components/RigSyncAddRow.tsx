import { PropsWithChildren, useEffect, useState } from "react";
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

interface CreateMainCanopyTableFormProps extends PropsWithChildren {
  columnCount: number
  entityName?: string
  showSuccess?: boolean
}

const RigSyncAddRow = ({
  columnCount,
  entityName,
  children,
  showSuccess,
}: CreateMainCanopyTableFormProps) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    setIsFormOpen(false);
  }, [showSuccess]);

  return (
    <TableRow>
      <TableCell align="center" colSpan={columnCount}>
        {!isFormOpen && !showSuccess &&
          <IconButton
            color="primary"
            aria-label={`Add ${entityName ?? 'row'}`}
            onClick={() => { setIsFormOpen(true); }}
          >
            <AddIcon />
          </IconButton>
        }
        {isFormOpen &&
          <Stack alignItems="center">
            {children}
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
              {entityName ?? 'Row'} created
            </Typography>
          </Stack>
        }
      </TableCell>
    </TableRow>
  );
};

export default RigSyncAddRow;