import { PropsWithChildren, useEffect, useState } from "react";
import {
  IconButton,
  Stack,
  TableCell,
  TableRow,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import RigSyncSuccess from "./RigSyncSuccess";

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
          <RigSyncSuccess message={`${entityName ?? 'row'} created`} />
        }
      </TableCell>
    </TableRow>
  );
};

export default RigSyncAddRow;