import { SvgIcon, type SvgIconProps } from "@mui/material";

// allow props so callers can specify fontSize, color, etc.
const RigSyncIcon = (props: SvgIconProps) => (
  <SvgIcon {...props}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 260"
      fill="none"
      stroke="none"
    >
      <path
        d="
            M55 25
            C45 15, 30 15, 25 35
            L40 190
            C42 195, 48 200, 55 200
            L145 200
            C152 200, 158 195, 160 190
            L175 35
            C170 15, 155 15, 145 25
            Z"
        fill="#0D47A1"
      />

      <path
        d="M55 25 C75 80, 125 80, 145 25"
        fill="#FFFFFF"
      />

      <path
        d="M65 155 C85 170, 115 170, 135 155"
        fill="#1976D2"
      />

      <path
        d="
            M120 200
            L140 200
            L140 203
            Q140 206 135 206
            L125 206
            Q120 206 120 203
            L120 203
            Z
          "
        fill="#000000"
      />
    </svg>
  </SvgIcon>
);

export default RigSyncIcon;