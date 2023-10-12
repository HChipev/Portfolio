import axios from "axios";
import { configService } from "./ConfigService";

const client = axios.create({
  baseURL: configService.get("api.baseAPIAddress"),
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
    "Content-Type": "application/json",
  },
});

const login = async (data) => {
  const res = await client({
    method: "POST",
    url: configService.get("api.login"),
    data: data,
  });

  return res;
};

const refreshToken = async (data) => {
  const res = await client({
    method: "POST",
    url: configService.get("api.refreshToken"),
    data: data,
  });

  return res;
};

export default {
  login,
  refreshToken,
};
