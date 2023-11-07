import React,{useState, useEffect, useContext} from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Login from "./Login";
import Signup from "./Signup";
import { Button } from "@mui/material";
import AuthContext from "./AuthContext";
import { useNavigate } from "react-router-dom";
// import { useTheme } from '@mui/material/styles';

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Topbar() {
  // const theme = useTheme();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user, authTokens, logoutUser } = useContext(AuthContext);

  useEffect(() => {
    if (authTokens) {
      setIsMenuOpen(true);
    } else setIsMenuOpen(false)
  }, [authTokens, user, logoutUser]);

  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1, borderRadius: 0 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="small"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Stackoverflow clone
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />

          {isMenuOpen?  <>
          <MenuItem className="userinfo">
            {/* {console.log(user)} */}
            {user.pp ? <img className="pp" src={user.pp } alt="profile picture" aria-label="profile picture"/>: <AccountCircle/> }
            {user.name ? <p>{user.name} </p> : <p>no name</p>}
          </MenuItem>
          <MenuItem onClick={logoutUser}>Logout</MenuItem>
          </> :<><Login />
          <Signup /> </>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}
