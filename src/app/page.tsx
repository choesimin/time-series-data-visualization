"use client";

import * as React from "react";
import { Container, Typography, Button, ButtonGroup } from "@mui/material";
import getConfig, { getIds } from "@/services/config";
import { syncData } from "@/utils/api";

export default function Home() {
  const renderButtonGroups = () => {
    const ids = getIds();
    const groups = [];

    for (let i = 0; i < ids.length; i += 5) {
      const groupIds = ids.slice(i, i + 5);

      groups.push(
        <ButtonGroup key={i} variant="outlined">
          {groupIds.map((id) => (
            <Button key={id} onClick={() => syncData(id)}>
              {getConfig(id).name}
            </Button>
          ))}
        </ButtonGroup>
      );
    }

    return groups;
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{ mb: 2, textAlign: "center" }}
      >
        Data Visualization Project
      </Typography>
      <Button
        variant="contained"
        size="large"
        onClick={() => {
          getIds().forEach((id) => {
            syncData(id);
          });
        }}
      >
        모두 동기화
      </Button>
      {renderButtonGroups()}
    </Container>
  );
}
