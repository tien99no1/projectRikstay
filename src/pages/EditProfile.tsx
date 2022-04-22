import { Box, Button, Container, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavbarAdmin from "../components/layout/NavbarAdmin";
import { useForm } from "react-hook-form";
import { CONFIG } from "../config";
import { user } from "../type";

function EditProfile() {
  useEffect(() => {
    const token = localStorage.getItem("adminId");
    if (!token) {
      navigate("/adminLogin");
    } else {
      navigate(`/editprofile/${id}`);
    }
  }, []);
  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;

  const [user, setUser] = useState<user>();
  const loadUser = () => {
    axios.get(`${CONFIG.ApiUser}/${id}`).then((res) => {
      setUser(res.data);
    });
  };
  useEffect(() => {
    loadUser();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<user>();
  useEffect(() => {
    reset(user);
  }, [user]);
  const onSubmit = (data: user) => {
    axios.put(`${CONFIG.ApiUser}/${id}`, data).then((result) => {
      navigate("/adminPage");
    });
  };

  return (
    <>
      <NavbarAdmin />
      <Container>
        <Box textAlign={"center"} mt={"3rem"}>
          <h3>Chỉnh sửa thông tin người dùng</h3>
        </Box>
        <div>
          <form className="form-edit-profile" onSubmit={handleSubmit(onSubmit)}>
            <div className="name-edit">
              <div className="text-name">
                <TextField
                  className="edit-name"
                  label="Họ và tên đệm"
                  variant="outlined"
                  {...register("firstName", {
                    required: true,
                    maxLength: 80,
                    pattern:
                      /^[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ ]{2,}$/g,
                  })}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                {errors?.firstName?.type === "required" && (
                  <small>Vui lòng nhập trường này</small>
                )}
                {errors?.firstName?.type === "maxLength" && (
                  <small>Họ và tên đệm không được vượt quá 80 ký tự</small>
                )}
                {errors?.firstName?.type === "pattern" && (
                  <small>
                    Họ và tên đệm phải là chữ cái và dài hơn 2 ký tự
                  </small>
                )}
              </div>
              <div className="text-name">
                <TextField
                  className="edit-name"
                  label="Tên"
                  variant="outlined"
                  {...register("lastName", {
                    required: true,
                    maxLength: 100,
                    pattern:
                      /^[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ ]{2,}$/g,
                  })}
                  InputLabelProps={{
                    shrink: true,
                  }}
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
              </div>
            </div>
            <div className="edit-user">
              <TextField
                className="text-user-edit"
                label="Email"
                variant="outlined"
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {errors?.email?.type === "required" && (
                <small>Vui lòng nhập trường này</small>
              )}
              {errors?.email?.type === "pattern" && (
                <small>Email không hợp lệ</small>
              )}
            </div>
            <div className="edit-user">
              <TextField
                className="text-user-edit"
                label="Số điện thoại"
                variant="outlined"
                {...register("phone", {
                  required: true,
                  pattern: /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/i,
                })}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {errors?.phone?.type === "required" && (
                <small>Vui lòng nhập trường này</small>
              )}
              {errors?.phone?.type === "pattern" && (
                <small>Số điện thoại không hợp lệ</small>
              )}
            </div>
            <div className="edit-user">
              <TextField
                className="text-user-edit"
                label="Mật khẩu"
                variant="outlined"
                type="password"
                {...register("password", {
                  required: true,
                  pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i,
                })}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {errors?.password?.type === "required" && (
                <small>Vui lòng nhập trường này</small>
              )}
              {errors?.password?.type === "pattern" && (
                <small>
                  Vui lòng nhập mật khẩu ít nhất 8 ký tự, bao gồm chữ cái và số
                </small>
              )}
            </div>
            <Button type="submit" autoFocus className="btn-edit-user">
              Chỉnh sửa
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
}

export default EditProfile;
