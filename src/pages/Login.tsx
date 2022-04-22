import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, Container, styled, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import LoginSocialUser from "../components/LoginSocialUser";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { signUpSuccess } from "../store/userSlice";
import { useDispatch } from "react-redux";
import { CONFIG } from "../config";
import Noti from "../components/Noti";
import '../css/login.css'

interface IFormInputs {
  email: string;
  password: string;
}

function Login() {
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
      "& fieldset": {},
      "&:hover fieldset": {
        borderColor: "#FFF",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#FFF",
      },
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>();

  const navigate = useNavigate();
  const userName = useRef("");
  const userId = useRef("");
  const dispatch = useDispatch();
  const handleUser = async (email: string, password: string) => {
    try {
      const response = await axios.get(
        `${CONFIG.ApiUser}?email=${email}&password=${password}`
      );
      const data = await response.data;
      if (data.length > 0) {
        userName.current = data[0];
        userId.current = data[0].id;
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return error;
    }
  };

  const onSubmit = async (data: IFormInputs) => {
    const user = await handleUser(data.email, data.password);
    if (user) {
      navigate("/");
      localStorage.setItem("userId", JSON.stringify(userId.current));
      sessionStorage.removeItem('advide');
      dispatch(signUpSuccess(userName.current));
    } else {
      setPayloadNoti({
        status: "error",
        text: "Sai tài khoản hoặc mật khẩu",
      });
      setShowNoti(true);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      navigate("/");
    }
  }, []);

  return (
    <Box className="container-login">
      <Box style={{ position: "absolute", top: "20px" }} width={"100%"}>
        <Link to="/" className="brand br">
          RikStay
        </Link>
      </Box>
      <Box className="login">
        <Box className="form-register">
          <h3>Đăng nhập</h3>
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
            </Button>{" "}
            <br />
          </form>
        </Box>
        <Box className="form-login">
          <p>
            Bạn chưa có tài khoản RikStay?{" "}
            <Link
              style={{
                textDecoration: "none",
                color: "#b71c1c",
                fontSize: "1.1rem",
                fontWeight: "600",
              }}
              to="/signup"
            >
              Đăng ký
            </Link>
          </p>
          <p>Hoặc đăng nhập với</p>
          <Box className="gg-login">
            <LoginSocialUser />
          </Box>
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
export default Login;
