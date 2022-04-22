import { CONFIG } from "../config/index";
import axios from "axios";

export const removeUser = async (id: number) => {
  return await axios.delete(`${CONFIG.ApiUser}/${id}`);
};
