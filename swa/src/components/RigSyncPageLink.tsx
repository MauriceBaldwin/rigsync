import { useEffect, useState } from "react";
import { Link as RouterLink, useLocation } from "react-router";
import { Link, Stack } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

export interface RigSyncLink {
  to: string
  title: string
  isReturn?: boolean
}

export interface RigSyncPageLinkProps {
  link: RigSyncLink
}

const RigSyncPageLink = ({ link }: RigSyncPageLinkProps) => {
  const { pathname } = useLocation();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (pathname === link.to) {
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
      to={link.to}
      color={isActive ? "primary" : "textDisabled"}
      aria-current={isActive ? "page" : false}
    >
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="flex-start"
      >
        {link.isReturn && <ChevronLeftIcon />}
        {link.title}
      </Stack>
    </Link>
  );
};

export default RigSyncPageLink;