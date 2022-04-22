import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Container } from "@mui/material";
import ListRoomUserOrder from "../components/ListRoomUserOrder";
import SettingProfile from "../components/SettingProfile";
import { useNavigate } from "react-router-dom";

function AdminPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('userId');
    if (!token) {
      navigate('/home');
    } else {
      navigate('/home/profile')
    }
  }, [])
  const [value, setValue] = React.useState("1");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <div>
      <Container maxWidth='xl'>
      <Box sx={{mt: 4, width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Danh sách đặt phòng" value="1" />
              <Tab label="Chỉnh sửa thông tin" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1"><ListRoomUserOrder/></TabPanel>
          <TabPanel value="2"><SettingProfile/></TabPanel>
        </TabContext>
      </Box>
      </Container>
    </div>
  );
}

export default AdminPage;
