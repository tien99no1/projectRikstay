import React from "react";
import "./App.css";
import Layout from "./components/layout/";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Guide from "./pages/Guide";
import Host from "./pages/Host";
import SignUp from "./pages/SignUp";
import Location from "./pages/Location";
import Room from "./pages/Room";
import DashBoard from "./pages/DashBoard";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import CreateRoom from "./pages/CreateRoom";
import EditRoom from "./pages/EditRoom";
import LoginAdmin from "./pages/adminLogin";
import AdminPage from "./pages/AdminPage";
import EditProfile from "./pages/EditProfile";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home/*" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="profile" element= {<Profile/>}/>
          <Route path="location/:address" element={<Location />} />
          <Route path="room/:id" element={<Room />} />
        </Route>
        <Route path="/guide" element={<Guide />} />
        <Route path="/host" element={<Host />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/adminLogin" element={<LoginAdmin />} />
        <Route path="/adminPage" element={<AdminPage />} />
        <Route path="/editprofile/:id" element={<EditProfile />} />
        <Route path="/create" element={<CreateRoom />} />
        <Route path="/editroom/:id" element={<EditRoom />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
