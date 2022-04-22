import { CONFIG } from "../config/index";
import axios from "axios";

export const getRoomNames = async () => {
  return await axios.get(`${CONFIG.ApiRoom}`);
};

export const createRoom = async (roomName: string) => {
  return await axios.post(`${CONFIG.ApiRoom}`, roomName);
};

export const removeRoom = async (id: number) => {
  return await axios.delete(`${CONFIG.ApiRoom}/${id}`);
};

export const getRoomName = async (id: number) => {
  return await axios.get(`${CONFIG.ApiRoom}/${id}`);
};

export const updateRoom = async (id: number, roomName: any) => {
  return await axios.put(`${CONFIG.ApiRoom}/${id}`, roomName);
};

export const creatBookRoom = async () => {
  return await axios.post(`${CONFIG.ApiBookRoom}`);
};
