import { Link } from "react-router";
import {
  Typography,
  Card,
  CardContent,
  CardActionArea,
  List,
  Stack,
  ListItem,
  ListItemText,
} from '@mui/material';
import { RigResponse } from "../api";
import RigSyncListItemDateColoured from "./RigSyncListItemDateColoured";

interface RigSyncRigCardProps {
  rig: RigResponse
}

const RigSyncRigCard = ({ rig }: RigSyncRigCardProps) => (
  <Card sx={{ width: 350 }}>
    <CardActionArea
      component={Link}
      to={`/rigs/${rig.id}`}
    >
      <CardContent>
        <Typography variant="h5" color="primary">
          {rig.name}
        </Typography>

        <List sx={{ width: '100%' }}>
          <Stack direction="row" alignItems="center" justifyContent="end">
            <ListItem disablePadding>
              <ListItemText
                primary={
                  rig.mainCanopy.model + ' ' + rig.mainCanopy.size.toString()
                }
                secondary="Main canopy"
              />
            </ListItem>

            <ListItem disablePadding>
              <ListItemText
                primary={
                  rig.reserveCanopy.model + ' ' +
                  rig.reserveCanopy.size.toString()
                }
                secondary="Reserve canopy"
              />
            </ListItem>
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="end">
            <ListItem disablePadding>
              <ListItemText
                primary={rig.aad.manufacturer + ' ' + rig.aad.model}
                secondary="AAD"
              />
            </ListItem>

            <ListItem disablePadding>
              <ListItemText
                primary={
                  rig.container.manufacturer + ' ' + rig.container.model
                }
                secondary="Container"
              />
            </ListItem>
          </Stack>

          <RigSyncListItemDateColoured
            date={rig.nextReserveRepackDue}
            label="Next reserve repack due"
          />
        </List>
      </CardContent>
    </CardActionArea>
  </Card>
);

export default RigSyncRigCard;
