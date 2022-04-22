import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { GoogleLogout } from "react-google-login";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../css/dashboard.css";
import ListRoom from "../components/ListRoom";
import { CONFIG } from "../config";
import News from "../components/News";
import { ConfirmProvider } from "material-ui-confirm";
import { useEffect } from "react";

const clientId = `${CONFIG.GOOLGE_CLIENT_ID}`;
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Host() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("hostId");
    if (!token) {
      navigate("/host");
    } else {
      navigate("/dashboard");
    }
  }, []);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  //google logout
  const onSignoutSuccess = () => {
    console.clear();
    navigate("/host");
  };
  const handleLogout = () => {
    localStorage.removeItem("hostId");
    localStorage.removeItem("hostName");
    navigate("/host");
  };
  const [host, setHost] = React.useState([]);

  React.useEffect(() => {
    const host = JSON.parse(localStorage.getItem("hostName") || "{}");
    if (host) {
      setHost(host);
    }
  }, []);

  return (
    <>
      <Box className="header-host">
        <Box style={{ position: "absolute" }} width={"100%"}>
          <Link to="/" className="brand br-host ">
            RikStay
          </Link>
        </Box>
        <Box className="box-create-btn">
          <Link className="link" to="/create">
            <Button className="btn-create-room">Tạo chỗ nghỉ mới</Button>
          </Link>
          <Box>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <Avatar alt="" src="">
                {host[0]}
              </Avatar>
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
                <button className="btn-logout" onClick={handleLogout}>
                  <GoogleLogout
                    icon={false}
                    className="gg-logout"
                    clientId={clientId}
                    buttonText="Đăng xuất"
                    onLogoutSuccess={onSignoutSuccess}
                  ></GoogleLogout>
                </button>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Box>
      <Container maxWidth="xl">
        <Box sx={{ width: "100%", mt: "4rem" }}>
          <Box sx={{ borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Chỗ nghỉ" {...a11yProps(0)} />
              <Tab label="Bảng tin" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={1}>
            <Typography
              variant="h6"
              component="h2"
              sx={{ display: "flex", fontWeight: "500", m: "1rem 0 1rem 0" }}
            >
              Đặt chỗ gần đây
            </Typography>
            <div>
              <News />
            </div>
          </TabPanel>
          <TabPanel value={value} index={0}>
            <div style={{ height: 400, width: "100%", textAlign: "center" }}>
              <ConfirmProvider>
                <ListRoom />
              </ConfirmProvider>
            </div>
          </TabPanel>
        </Box>
      </Container>
    </>
  );
}
