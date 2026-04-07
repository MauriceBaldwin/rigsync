import { Link } from "react-router";
import {
  Typography,
  Card,
  CardContent,
  CardActionArea,
  List,
  Stack,
} from '@mui/material';
import { RigResponse } from "../api";
import RigSyncListItemDateColoured from "./RigSyncListItemDateColoured";
import {
  formatAad,
  formatContainer,
  formatMainCanopy,
  formatReserveCanopy,
  withDescription,
} from "./utils/formatters";
import RigSyncListItemString from "./RigSyncListItemString";

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
            <RigSyncListItemString
              value={formatMainCanopy(rig.mainCanopy)}
              secondaryValue={withDescription('', rig.mainCanopy)}
              label="Main canopy"
            />

            <RigSyncListItemString
              value={formatReserveCanopy(rig.reserveCanopy)}
              secondaryValue={withDescription('', rig.reserveCanopy)}
              label="Reserve canopy"
            />
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="end">
            <RigSyncListItemString
              value={formatAad(rig.aad)}
              secondaryValue={withDescription('', rig.aad)}
              label="AAD"
            />

            <RigSyncListItemString
              value={formatContainer(rig.container)}
              secondaryValue={withDescription('', rig.container)}
              label="Container"
            />
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
