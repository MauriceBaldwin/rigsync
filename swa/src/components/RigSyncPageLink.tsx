import { useEffect, useState } from "react";
import { Link as RouterLink, useLocation } from "react-router";
import { Link, Stack } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

export interface RigSyncPageLinkProps {
  to: string
  title: string
  isReturn?: boolean
}

const RigSyncPageLink = ({ to, title, isReturn }: RigSyncPageLinkProps) => {
  const { pathname } = useLocation();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (pathname === to) {
      setIsActive(true);
    }
    else {
      setIsActive(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Link
      variant="body1"
      component={RouterLink}
      to={to}
      color={isActive ? "primary" : "textDisabled"}
    >
      <Stack direction="row" spacing={1}>
        {isReturn && <ChevronLeftIcon />}
        {title}
      </Stack>
    </Link>
  );
};

export default RigSyncPageLink;