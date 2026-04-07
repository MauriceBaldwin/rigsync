import dayjs from "dayjs";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RestoreIcon from '@mui/icons-material/Restore';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { DateResponse } from "../api";
import { dateResponseToDayJs } from "../api/utils";

interface Props {
  label: string;
  date?: DateResponse;
}

const RigSyncListItemDateColoured = ({ label, date }: Props) => {
  const parsedDate = dateResponseToDayJs(date);
  const today = dayjs();
  const twoWeeksFromToday = today.add(14, 'days');

  let renderIcon = null;
  let textColor: 'success' | 'warning' | 'error' | undefined = undefined;

  if (parsedDate) {
    if (parsedDate.isBefore(today, 'day') || parsedDate.isSame(today, 'day')) {
      // Today or past - error
      renderIcon = <ErrorOutlineIcon color="error" />;
      textColor = 'error';
    } else if (parsedDate.isBefore(twoWeeksFromToday, 'day')) {
      // Within next 2 weeks - warning
      renderIcon = <RestoreIcon color="warning" />;
      textColor = 'warning';
    } else {
      // More than 2 weeks - success
      renderIcon = <CheckCircleOutlineIcon color="success" />;
      textColor = 'success';
    }
  }

  return (
    <ListItem>
      {renderIcon && <ListItemIcon>{renderIcon}</ListItemIcon>}

      <ListItemText
        primary={
          parsedDate?.format('DD MMMM YYYY') ?? '-'
        }
        secondary={label}
        slotProps={{
          primary: textColor ? { color: textColor } : undefined,
        }}
      />
    </ListItem>
  );
};

export default RigSyncListItemDateColoured;
