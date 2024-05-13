import React from "react";
import Link from "next/link";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";

interface MenuItemProps {
  icon: React.ElementType;
  path?: string;
  onClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon: Icon, path, onClick }) => {
  return (
    <ListItem disablePadding>
      <Link href={path ? path : "#"} passHref>
        <IconButton size="large" sx={{ marginX: 1 }} onClick={onClick}>
          <Icon />
        </IconButton>
      </Link>
    </ListItem>
  );
};

export default MenuItem;
