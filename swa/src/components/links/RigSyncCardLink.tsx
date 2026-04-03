import { Link } from "react-router";
import {
  Typography,
  Card,
  CardContent,
  CardActionArea,
} from '@mui/material';

interface RigSyncCardLinkProps {
  title: string
  body: string
  to: string
}


const RigSyncCardLink = ({
  title,
  body,
  to,
}: RigSyncCardLinkProps) => (
  <Card sx={{ width: 350 }}>
    <CardActionArea component={Link}
      to={to}>
      <CardContent>
        <Typography gutterBottom variant="h5" color="primary">
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {body}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);

export default RigSyncCardLink;