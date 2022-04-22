import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Box, Button, styled, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import LoginSocialUser from "../components/LoginSocialUser";
import { CONFIG } from "../config";
import { user } from "../type";
import Noti from '../components/Noti'
import '../css/login.css'

function SignUp() {
  const [showNoti, setShowNoti] = useState(false)
  const [payloadNoti, setPayloadNoti] = useState({
    status: 'success',
    text: '',
  })
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<user>();
  const navigate = useNavigate();
  const handleUser = async (email: string) => {
    try {
      const response = await axios.get(
        `${CONFIG.ApiUser}?email=${email}`,
      );
      const checkEmail = await response.data;
      if (checkEmail.length > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return error;
    }
  };
  const onSubmit = async (data: user) => {
    const checkEmail = await handleUser(data.email)
    if(checkEmail) {
      setPayloadNoti({
        status: 'error',
        text: 'Tài khoản đã tồn tại',
      })
      setShowNoti(true)
    } else {
      axios.post(`${CONFIG.ApiUser}`, data)
      .then((data) => {
        setPayloadNoti({
          status: 'success',
          text: 'Đăng ký thành công',
        })
        setShowNoti(true)
        navigate('/login')
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
    }
    
  };

  return (
    <Box className="container-sign">
      <Box style={{ position: "absolute", top: "20px" }} width={"100%"}>
        <Link to="/" className="brand br">
          RikStay
        </Link>
      </Box>
      <Box className="sign">
        <Box className="form-register">
          <h3>Đăng ký thành viên</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box className="text-sign">
              <CustomTextField
                className="input-sign"
                label="Họ và tên đệm"
                variant="outlined"
                {...register("firstName", {
                  required: true,
                  maxLength: 80,
                  pattern:
                    /^[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ ]{2,}$/g,
                })}
              />
              {errors?.firstName?.type === "required" && (
                <small>Vui lòng nhập trường này</small>
              )}
              {errors?.firstName?.type === "maxLength" && (
                <small>Họ và tên đệm không được vượt quá 80 ký tự</small>
              )}
              {errors?.firstName?.type === "pattern" && (
                <small>Họ và tên đệm phải là chữ cái và dài hơn 2 ký tự</small>
              )}
            </Box>
            <Box className="text-sign">
              <CustomTextField
                className="input-sign"
                label="Tên"
                variant="outlined"
                {...register("lastName", {
                  required: true,
                  maxLength: 100,
                  pattern:
                    /^[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ ]{2,}$/g,
                })}
              />
              {errors?.lastName?.type === "required" && (
                <small>Vui lòng nhập trường này</small>
              )}
              {errors?.lastName?.type === "maxLength" && (
                <small>Tên không được vượt quá 100 ký tự</small>
              )}
              {errors?.lastName?.type === "pattern" && (
                <small>Tên phải là chữ cái và dài hơn 2 ký tự</small>
              )}
            </Box>
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
                label="Số điện thoại"
                variant="outlined"
                type="text"
                {...register("phone", {
                  required: true,
                  pattern: /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/i,
                })}
              />
              {errors?.phone?.type === "required" && (
                <small>Vui lòng nhập trường này</small>
              )}
              {errors?.phone?.type === "pattern" && (
                <small>Số điện thoại không hợp lệ</small>
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
              Đăng ký
            </Button>
            <br />
          </form>
        </Box>
        <Box className="form-login">
          <p>
            Bạn đã có tài khoản RikStay?
            <Link
              style={{
                textDecoration: "none",
                color: "#b71c1c",
                fontSize: "1.1rem",
                fontWeight: "600",
              }}
              to="/Login"
            >
              Đăng nhập
            </Link>
          </p>
          <p>Hoặc đăng nhập với</p>
          <Box className="gg-login">
            <LoginSocialUser />
          </Box>
        </Box>
      </Box>
      <Noti payload={payloadNoti} showNoti={showNoti} setShowNoti={setShowNoti} />
    </Box>
  );
}
export default SignUp;
