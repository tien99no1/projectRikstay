import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Badge,
  Button,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Box } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import styled from "@emotion/styled";
import { logoutRequest } from "../../store/userSlice";
import { CONFIG } from "../../config";
import { room } from "../../type";
import "../../css/Navbar.css";
import { AccountCircle } from "@mui/icons-material";

function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const userAuth = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    sessionStorage.removeItem("advide");
    dispatch(logoutRequest(userAuth));
    navigate("/");
  };

  const [roomSearching, setRoomSearching] = useState([]);
  const [rooms, setRooms] = useState([]);
  const getListRoom = async () => {
    try {
      const data = await axios.get(`${CONFIG.ApiRoom}?status=1&isCheck=false`);
      setRooms(data.data);
    } catch (e) {}
  };
  useEffect(() => {
    getListRoom();
  }, []);

  const handleSearch = (e: any) => {
    const search = e.target.value;
    const roomFilter = rooms.filter((room: room) => {
      return room.roomName.toLowerCase().includes(search.toLowerCase());
    });
    if (search == "") {
      return setRoomSearching([]);
    } else {
      return setRoomSearching(roomFilter);
    }
  };

  const onGoToRoomPage = (room: room) => {
    setRoomSearching([]);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleClose}>
      <Link className="link menu-item " to="/host">
         Host
      </Link>
    </MenuItem>
    {localStorage.getItem("userId")? (
      <>
        <MenuItem onClick={handleClose}>
      <Link className="link menu-item " to="/home/profile">
         Tài khoản
      </Link>
    </MenuItem>
    <MenuItem onClick={handleClose}>
      <button
        className="btn-logout menu-item"
        onClick={handleLogout}
      >
         Đăng xuất
      </button>
    </MenuItem>
      </>
    ) : (
      <>
        <MenuItem onClick={handleClose}>
      <Link className="link menu-item " to="/signup">
         Đăng ký
      </Link>
    </MenuItem>
    <MenuItem onClick={handleClose}>
    <Link className="link menu-item " to="/login">
         Đăng nhập
      </Link>
    </MenuItem>
      </>
    )}
      
    </Menu>
  );
  return (
    <AppBar position="sticky" color="inherit">
      <Toolbar>
        <Link to="/" className="brand">
          RikStay
        </Link>
        <div className="box-search">
          <input
            className="input-search"
            placeholder="Tìm kiếm..."
            onChange={handleSearch}
          />
          <button className="btn-search btn--primary btn--inside">
            <SearchIcon sx={{ fontSize: "1.9rem" }} />
          </button>
        </div>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
          <ul className="nav-right">
            <li style={{ marginRight: "1.2rem" }} className="nav-items">
              <Link to="/host">Host</Link>
            </li>
            {localStorage.getItem("userId") ? (
              <Box>
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <li className="nav-items">
                    <Avatar
                      sx={{
                        width: "25px",
                        height: "25px",
                        fontSize: "1rem",
                        marginRight: "5px",
                      }}
                      alt=""
                      src=""
                    >
                      {userAuth.lastName[0]}
                    </Avatar>
                  </li>
                  <li className="nav-items">
                    <span style={{ color: "#000" }}>{userAuth.lastName}</span>
                  </li>
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleClose}>
                    <Link className="link menu-item " to="/home/profile">
                      <AccountCircleIcon /> Tài khoản
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <button
                      className="btn-logout menu-item"
                      onClick={handleLogout}
                    >
                      <LogoutIcon /> Đăng xuất
                    </button>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <>
                <Box
                  sx={{
                    display: { xs: "none", md: "flex" },
                    alignItems: "center",
                  }}
                >
                  <li className="nav-items">
                    <Link to="/signup">Đăng ký</Link>
                  </li>
                  <li className="nav-items">
                    <Link to="/login">Đăng nhập</Link>
                  </li>
                </Box>
              </>
            )}
          </ul>
        </Box>
        <Box sx={{ display: { xs: "flex", md: "none", color: "black" } }}>
          <IconButton
            size="large"
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
        </Box>
      </Toolbar>
      {roomSearching.length !== 0 && (
        <div className="search-result">
          {roomSearching.map((room: any, key: any) => {
            return (
              <Link
                className="link"
                to={`/home/room/${room.id}`}
                onClick={() => onGoToRoomPage(room)}
              >
                <div className="list-search">
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <img src={room.roomImg} alt="" width="100px" />
                    <Box sx={{ ml: "1rem" }}>
                      <Typography sx={{ fontSize: "1rem", fontWeight: "700" }}>
                        {room.roomName}
                      </Typography>
                      <Typography sx={{ fontSize: "0.8rem" }}>
                        {room.address}, {room.addressDetail}
                      </Typography>
                    </Box>
                  </Box>
                </div>
              </Link>
            );
          })}
        </div>
      )}
      {renderMobileMenu}
      {/* {renderMenu} */}
    </AppBar>
  );
}

export default Navbar;
