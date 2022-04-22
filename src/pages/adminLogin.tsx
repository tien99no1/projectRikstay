import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, styled, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CONFIG } from "../config";
import Noti from "../components/Noti";
import axios from "axios";

interface IFormInputs {
  email: string;
  password: string;
}

function LoginAdmin() {
  const [showNoti, setShowNoti] = useState(false);
  const [payloadNoti, setPayloadNoti] = useState({
    status: "success",
    text: "",
  });
  const CustomTextField = styled(TextField)({
    "& label.Mui-focused": {
      color: "#959392",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#959392",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#FFF",
      },
      "&:hover fieldset": {
        borderColor: "#FFF",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#FFF",
      },
    },
  });
  const adminId = useRef("");

  const handleAdmin = async (email: string, password: string) => {
    try {
      const response = await axios.get(
        `${CONFIG.ApiAdmin}?email=${email}&password=${password}`
      );

      const dataAdmin = await response.data;
      if (dataAdmin.length > 0) {
        adminId.current = dataAdmin[0].id;
        console.log("true");
        return true;
      } else {
        console.log("false");
        return false;
      }
    } catch (error) {
      return error;
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>();

  const navigate = useNavigate();

  const onSubmit = async (data: IFormInputs) => {
    const admin = await handleAdmin(data.email, data.password);
    if (admin) {
      localStorage.setItem("adminId", JSON.stringify(adminId.current));
      navigate("/adminPage");
    } else {
      setPayloadNoti({
        status: "error",
        text: "Sai tài khoản hoặc mật khẩu",
      });
      setShowNoti(true);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("adminId")) {
      navigate("/adminPage");
    }
  }, []);

  return (
    <Box className="host-login-container">
      <Box style={{ position: "absolute", top: "20px" }} width={"100%"}>
        <Link to="/" className="brand br">
          RikStay
        </Link>
      </Box>
      <Box className="login login-host">
        <Box className="form-register">
          <h3>Đăng nhập Admin</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box className="text-sign">
              <CustomTextField
                className="input-sign"
                label="Địa chỉ email"
                variant="outlined"
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
              />
              {errors?.email?.type === "required" && (
                <small>Vui lòng nhập trường này</small>
              )}
              {errors?.email?.type === "pattern" && (
                <small>Email không hợp lệ</small>
              )}
            </Box>
            <Box className="text-sign">
              <CustomTextField
                className="input-sign"
                label="Mật khẩu"
                variant="outlined"
                type={"password"}
                {...register("password", {
                  required: true,
                  pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i,
                })}
              />
              {errors?.password?.type === "required" && (
                <small>Vui lòng nhập trường này</small>
              )}
              {errors?.password?.type === "pattern" && (
                <small>
                  Vui lòng nhập mật khẩu ít nhất 8 ký tự, bao gồm chữ cái và số
                </small>
              )}
            </Box>
            <Button className="btn-submit-form" type="submit">
              Đăng Nhập
            </Button>
            <br />
          </form>
        </Box>
      </Box>
      <Noti
        payload={payloadNoti}
        showNoti={showNoti}
        setShowNoti={setShowNoti}
      />
    </Box>
  );
}
export default LoginAdmin;
