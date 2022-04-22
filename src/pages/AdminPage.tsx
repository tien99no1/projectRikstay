import React, { useEffect } from "react";
import NavbarAdmin from "../components/layout/NavbarAdmin";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Container } from "@mui/material";
import ListRoomAdmin from "../components/ListRoomAdmin";
import ListOrderAdmin from "../components/ListOrderAdmin";
import ListUser from "../components/ListUsers";
import Footer from "../components/layout/Footer";
import { useNavigate } from "react-router-dom";
import { ConfirmProvider } from "material-ui-confirm";

function AdminPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("adminId");
    if (!token) {
      navigate("/adminLogin");
    } else {
      navigate("/adminPage");
    }
  }, []);

  const [value, setValue] = React.useState("1");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <div>
      <NavbarAdmin />
      <Container maxWidth="xl">
        <Box sx={{ mt: 4, width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Danh sách chỗ nghỉ" value="1" />
                <Tab label="Danh sách đặt phòng" value="2" />
                <Tab label="Tài khoản khách hàng" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <ConfirmProvider>
                <ListRoomAdmin />
              </ConfirmProvider>
            </TabPanel>
            <TabPanel value="2">
              <ListOrderAdmin />
            </TabPanel>
            <TabPanel value="3">
              <ListUser />
            </TabPanel>
          </TabContext>
        </Box>
      </Container>
      <Footer />
    </div>
  );
}

export default AdminPage;
