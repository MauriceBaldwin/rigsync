import { Stack, Typography } from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';

interface RigSyncSuccessProps {
  message: string
}


const RigSyncSuccess = ({ message }: RigSyncSuccessProps) => {
  return (
    <Stack justifyContent="center" direction="row" spacing={2}>
      <DoneIcon color="success" />
      <Typography variant="body1" color="success">
        {message}
      </Typography>
    </Stack>
  );
};

export default RigSyncSuccess;