import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import HomeIcon from "@mui/icons-material/Home";
import PublicIcon from "@mui/icons-material/Public";
import { useNavigate } from "react-router-dom";

export default function BasicList() {
  const navigate = useNavigate();
  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }} variant="filled">
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon sx={{fontSize:"20px"}}/>
              </ListItemIcon>
              <ListItemText
                primary="Home"
                onClick={() => navigate("/")}
                primaryTypographyProps={{
                  fontSize: 14,
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem>
            <ListItemIcon>
              <PublicIcon sx={{fontSize:"20px"}}/>
            </ListItemIcon>
            <ListItemText
              primary="Public"
              primaryTypographyProps={{
                fontSize: 14,
              }}
            />
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText
                primary="Questions"
                onClick={() => navigate("/question")}
                primaryTypographyProps={{
                  fontSize: 14,
                }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/tag")}>
              <ListItemText
                primary="Tags"
                primaryTypographyProps={{
                  fontSize: 14,
                }}
              />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText
                primary="Users"
                onClick={() => navigate("/users")}
                primaryTypographyProps={{
                  fontSize: 14,
                }}
              />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/company")}>
              <ListItemText
                primary="Companies"
                primaryTypographyProps={{
                  fontSize: 14,
                }}
              />
            </ListItemButton>
          </ListItem>
          <Divider />
        </List>
      </nav>
    </Box>
  );
}
