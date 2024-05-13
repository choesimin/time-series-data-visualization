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
      {"Copyright © "}
      <Link color="inherit" href="http://www.paymint.co.kr">
        Paymint
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}
