import { Container, Typography } from "@mui/material";
import { RigSyncLink } from "./links/links";
import RigSyncPageLink from "./links/RigSyncPageLink";

interface Props {
  title: string;
  link?: RigSyncLink
}

const RigSyncTitle = ({ title, link }: Props) => (
  <Container disableGutters>
    <Typography variant="h1" color="primary">{title}</Typography>

    {link && <RigSyncPageLink link={link} />}
  </Container>
);

export default RigSyncTitle;