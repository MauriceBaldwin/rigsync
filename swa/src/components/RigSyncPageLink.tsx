import { Link as RouterLink, useLocation } from "react-router";
import { Link } from "@mui/material";
import { useEffect, useState } from "react";

interface RigSyncPageLinkProps {
  to: string
  title: string
}

const RigSyncPageLink = ({ to, title }: RigSyncPageLinkProps) => {
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
      {title}
    </Link>
  );
};

export default RigSyncPageLink;