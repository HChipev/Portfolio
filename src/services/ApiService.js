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

const addFramework = async (data) => {
  const res = await client({
    method: "POST",
    url: configService.get("api.addFramework"),
    data: data,
  });

  return res;
};

const getFrameworks = async () => {
  const res = await client({
    method: "GET",
    url: configService.get("api.getFrameworks"),
  });

  return res;
};

const getFramework = async (id) => {
  const res = await client({
    method: "GET",
    url: configService.get("api.getFramework") + id,
  });

  return res;
};

const updateFramework = async (data) => {
  const res = await client({
    method: "PUT",
    url: configService.get("api.updateFramework"),
    data: data,
  });

  return res;
};

const deleteFramework = async (id) => {
  const res = await client({
    method: "DELETE",
    url: configService.get("api.deleteFramework") + id,
  });

  return res;
};

const addTool = async (data) => {
  const res = await client({
    method: "POST",
    url: configService.get("api.addTool"),
    data: data,
  });

  return res;
};

const getTools = async () => {
  const res = await client({
    method: "GET",
    url: configService.get("api.getTools"),
  });

  return res;
};

const getTool = async (id) => {
  const res = await client({
    method: "GET",
    url: configService.get("api.getTool") + id,
  });

  return res;
};

const updateTool = async (data) => {
  const res = await client({
    method: "PUT",
    url: configService.get("api.updateTool"),
    data: data,
  });

  return res;
};

const deleteTool = async (id) => {
  const res = await client({
    method: "DELETE",
    url: configService.get("api.deleteTool") + id,
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
  addFramework,
  getFrameworks,
  getFramework,
  updateFramework,
  deleteFramework,
  addTool,
  getTools,
  getTool,
  updateTool,
  deleteTool,
};
