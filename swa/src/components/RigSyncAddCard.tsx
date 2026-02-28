import { PropsWithChildren, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  IconButton,
  Stack,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import RigSyncSuccess from "./RigSyncSuccess";

interface RigSyncAddCardProps extends PropsWithChildren {
  entityName?: string
  showSuccess?: boolean
}

const RigSyncAddCard = ({
  entityName,
  children,
  showSuccess,
}: RigSyncAddCardProps) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    setIsFormOpen(false);
  }, [showSuccess]);

  return (
    <Card sx={{ width: 350 }}>
      <CardContent sx={{ height: "100%" }}>
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{ height: "90%" }}
        >
          {!isFormOpen && !showSuccess &&
            <IconButton
              size="large"
              color="primary"
              aria-label={`Add ${entityName ?? 'card'}`}
              onClick={() => { setIsFormOpen(true); }}
            >
              <AddIcon />
            </IconButton>
          }

          {isFormOpen &&
            <>
              {children}
              <IconButton
                aria-label="Cancel"
                onClick={() => { setIsFormOpen(false); }}
              >
                <CloseIcon />
              </IconButton>
            </>
          }

          {showSuccess &&
            <RigSyncSuccess message={`${entityName ?? 'card'} created`} />
          }
        </Stack>
      </CardContent>
    </Card>
  );
};

export default RigSyncAddCard;