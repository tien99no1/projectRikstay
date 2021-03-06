import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Box, Button, styled, TextField } from "@mui/material";
import LoginSocial from "../components/LoginSocialMedia";
import { CONFIG } from "../config";
import '../css/login.css'
import axios from "axios";
import Noti from "../components/Noti";

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
  const hostName = useRef('');
  const hostId = useRef('');

  const handleUser = async (email: string, password: string) => {
    try {
      const response = await axios.get(
        `${CONFIG.ApiUser}?email=${email}&password=${password}`,
      );

      const dataHost = await response.data;
      if (dataHost.length > 0) {
        hostName.current = dataHost[0].lastName;
        hostId.current = dataHost[0].id;
        return true;
      } else {
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
    const user = await handleUser(data.email, data.password);
    if (user) {
      navigate("/dashboard");
      localStorage.setItem("hostName", JSON.stringify(hostName.current));
      localStorage.setItem("hostId", JSON.stringify(hostId.current));
    } else {
      setPayloadNoti({
        status: "error",
        text: "Sai t??i kho???n ho???c m???t kh???u",
      });
      setShowNoti(true);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("hostId")) {
      navigate("/dashboard");
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
          <h3>????ng nh???p</h3>
          <Box>
            <LoginSocial />
          </Box>
          <Box className="or">
            <div className="line" />
            <div className="or-line">Ho???c</div>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box className="text-sign">
              <CustomTextField
                className="input-sign"
                label="?????a ch??? email"
                variant="outlined"
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
              />
              {errors?.email?.type === "required" && (
                <small>Vui l??ng nh???p tr?????ng n??y</small>
              )}
              {errors?.email?.type === "pattern" && (
                <small>Email kh??ng h???p l???</small>
              )}
            </Box>
            <Box className="text-sign">
              <CustomTextField
                className="input-sign"
                label="M???t kh???u"
                variant="outlined"
                type={"password"}
                {...register("password", {
                  required: true,
                  pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i,
                })}
              />
              {errors?.password?.type === "required" && (
                <small>Vui l??ng nh???p tr?????ng n??y</small>
              )}
              {errors?.password?.type === "pattern" && (
                <small>
                  Vui l??ng nh???p m???t kh???u ??t nh???t 8 k?? t???, bao g???m ch??? c??i v?? s???
                </small>
              )}
            </Box>
            <Button className="btn-submit-form" type="submit">
              ????ng Nh???p
            </Button>
            <br />
          </form>
        </Box>
        <Box className="login-host-right">
          <p>
            B???n ch??a ????ng k???
            <Link
              style={{
                textDecoration: "none",
                color: "#b71c1c",
                fontSize: "1rem",
                fontWeight: "600",
              }}
              to="/signup"
            >
              ????ng k?? ngay
            </Link>
          </p>
          <p>
            Ch??ng t??i kh??ng thu ph?? khi b???n ????ng ch??? ngh???. N???u ch??? ngh??? c???a b???n
            ?????t ti??u chu???n ???????c ki???m duy???t ????ng t???i tr??n Luxstay, ch??ng t??i ch???
            thu ph?? khi c?? booking
          </p>
          <p>
            Hotline:
            <a className="hotline" href="tel: 18001989">
              18001989 (Nh??nh 1 ph??m 2)
            </a>
          </p>
          <Box>
            <span>T???i ???ng d???ng Rikstay gi??p b???n qu???n l?? ch??? ngh??? d??? d??ng</span>
          </Box>
          <Box display={"flex"}>
            <Box>
              <p>
                <img
                  width={"180"}
                  height={"40"}
                  src="https://www.luxstay.com/icons/apple-store.svg"
                  alt=""
                />
              </p>
              <p>
                <img
                  width={"180"}
                  height={"40"}
                  src="https://www.luxstay.com/icons/google-play.svg"
                  alt=""
                />
              </p>
            </Box>
            <p>
              <img
                width={"100"}
                height={"100"}
                src="https://host.luxstay.net/pr_code.png"
                alt=""
              />
            </p>
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
