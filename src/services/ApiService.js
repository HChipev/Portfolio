import axios from "axios";
import { configService } from "./ConfigService";

const client = axios.create({
  baseURL: configService.get("api.baseAPIAddress"),
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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

const addLanguage = async (data) => {
  const res = await client({
    method: "POST",
    url: configService.get("api.addLanguage"),
    data: data,
  });

  return res;
};

const getLanguages = async () => {
  const res = await client({
    method: "GET",
    url: configService.get("api.getLanguages"),
  });

  return res;
};

const getLanguage = async (id) => {
  const res = await client({
    method: "GET",
    url: configService.get("api.getLanguage") + id,
  });

  return res;
};

const updateLanguage = async (data) => {
  const res = await client({
    method: "PUT",
    url: configService.get("api.updateLanguage"),
    data: data,
  });

  return res;
};

const deleteLanguage = async (id) => {
  const res = await client({
    method: "DELETE",
    url: configService.get("api.deleteLanguage") + id,
  });

  return res;
};

export default {
  login,
  refreshToken,
  addLanguage,
  getLanguages,
  getLanguage,
  updateLanguage,
  deleteLanguage,
};
