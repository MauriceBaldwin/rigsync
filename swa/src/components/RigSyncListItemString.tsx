import { ListItem, ListItemText, Typography } from "@mui/material";

interface Props {
  value: string;
  secondaryValue?: string;
  label: string
}

const RigSyncListItemString = ({ value, secondaryValue, label }: Props) => {
  return (
    <ListItem disablePadding>
      <ListItemText
        primary={
          <>
            <Typography variant="body1">
              {value}
            </Typography>

            {secondaryValue && (
              <Typography variant="body2">
                {secondaryValue}
              </Typography>
            )}
          </>
        }
        secondary={label}
      />
    </ListItem>
  );
};

export default RigSyncListItemString;
