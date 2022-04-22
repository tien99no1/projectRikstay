import {
  Avatar,
  Button,
  Container,
  Dialog,
  Table,
  TableBody,
  TableCell,
  TableRow,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
} from "@mui/material";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import React, { useEffect, useState } from "react";
import "../css/profile.css";
import { user } from "../type";
import { useForm } from "react-hook-form";
import axios from "axios";
import { CONFIG } from "../config";
import { useDispatch } from "react-redux";
import { signUpSuccess } from "../store/userSlice";

function SettingProfile() {
  const dispatch = useDispatch();
  const [user, setUser] = useState<user>();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const getUser = async () => {
    try {
      const id = JSON.parse(localStorage.getItem("userId") || "{}");
      const data = await axios.get(`${CONFIG.ApiUser}/${id}`);
      setUser(data.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<user>();
  const onSubmit = (data: user) => {
    const id = JSON.parse(localStorage.getItem("userId") || "{}");
    axios.put(`${CONFIG.ApiUser}/${id}`, data).then((result) => {
      dispatch(signUpSuccess(data));
      getUser();
      setOpen(false);
    });
  };
  useEffect(() => {
    reset(user);
  }, [user]);
  return (
    <>
      <Container maxWidth="xl">
        <div className="banner-profile"></div>
        <div className="body-profile">
          <div className="profile">
            <div className="avatar">
              <Avatar className="avatar-img">{user?.lastName[0]}</Avatar>
              <p className="name">
                {user?.firstName} {user?.lastName}
              </p>
              <Button title="Chỉnh sửa" onClick={handleClickOpen}>
                <ModeEditOutlineOutlinedIcon />
              </Button>
            </div>
            <div>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
              >
                <DialogTitle
                  className="title-dialog"
                  id="responsive-dialog-title"
                >
                  {"Chỉnh sửa thông tin"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText width={"500px"}>
                    <form onSubmit={handleSubmit(onSubmit)}>
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
                          />
                          {errors?.firstName?.type === "required" && (
                            <small>Vui lòng nhập trường này</small>
                          )}
                          {errors?.firstName?.type === "maxLength" && (
                            <small>
                              Họ và tên đệm không được vượt quá 80 ký tự
                            </small>
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
                          />
                          {errors?.lastName?.type === "required" && (
                            <small>Vui lòng nhập trường này</small>
                          )}
                          {errors?.lastName?.type === "maxLength" && (
                            <small>Tên không được vượt quá 100 ký tự</small>
                          )}
                          {errors?.lastName?.type === "pattern" && (
                            <small>
                              Tên phải là chữ cái và dài hơn 2 ký tự
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="edit-user">
                        <TextField
                          className="text-user-edit"
                          label="Email"
                          value={user?.email}
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
                        />
                        {errors?.password?.type === "required" && (
                          <small>Vui lòng nhập trường này</small>
                        )}
                        {errors?.password?.type === "pattern" && (
                          <small>
                            Vui lòng nhập mật khẩu ít nhất 8 ký tự, bao gồm chữ
                            cái và số
                          </small>
                        )}
                      </div>
                      <Button type="submit" autoFocus className="btn-edit-user">
                        Chỉnh sửa
                      </Button>
                    </form>
                  </DialogContentText>
                </DialogContent>
                <Button autoFocus onClick={handleClose} color="info">
                  Hủy
                </Button>
              </Dialog>
            </div>
            <div>
              <Table className="table">
                <TableBody>
                  <TableRow>
                    <TableCell className="TableRow" variant="head">
                      <span className="t-head">Họ và tên đệm</span>
                    </TableCell>
                    <TableCell className="value-user">
                      {user?.firstName}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="TableRow" variant="head">
                      <span className="t-head">Tên</span>
                    </TableCell>
                    <TableCell className="value-user">
                      {user?.lastName}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="TableRow" variant="head">
                      <span className="t-head">Email</span>
                    </TableCell>
                    <TableCell className="value-user">{user?.email}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="TableRow" variant="head">
                      <span className="t-head">Số điện thoại</span>
                    </TableCell>
                    <TableCell className="value-user">{user?.phone}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default SettingProfile;
