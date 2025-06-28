import { Container, Stack, Typography } from "@mui/material";
import RigSyncPageLink, { RigSyncPageLinkProps } from "../RigSyncPageLink";

interface RigSyncEntityLoadErrorProps {
  error: string
  entityName?: string
  link?: RigSyncPageLinkProps
}

const RigSyncEntityLoadError = ({
  error,
  entityName,
  link,
}: RigSyncEntityLoadErrorProps) => {

  return (
    <Stack spacing={4} alignItems="baseline">
      <Container disableGutters>
        <Typography variant="h1" color="error">
          Failed to load {entityName ?? 'entity'}
        </Typography>

        {link &&
          <RigSyncPageLink
            to={link.to}
            title={link.title}
            isReturn={link.isReturn}
          />
        }
      </Container>

      <Typography>{error}</Typography>
    </Stack>
  );
};

export default RigSyncEntityLoadError;