import * as React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export default function Copyright() {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{
        marginY: 5,
      }}
    >
      {`Copyright ${new Date().getFullYear()}. `}
      <Link color="inherit" href="https://www.simin.im">
        최시민
      </Link>
      {" all rights reserved."}
    </Typography>
  );
}
