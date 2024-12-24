import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import axios from "axios";
import KeyCloakService from "./KeycloakService";

const HttpMethods = {
  GET: "GET",
  POST: "POST",
  DELETE: "DELETE",
};

const _axios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
});

const cb = (config: InternalAxiosRequestConfig) => {
  config.headers.Authorization = `Bearer ${KeyCloakService.GetAccesToken()}`;
  return config;
};

const configureAxiosKeycloak = (): void => {
  _axios.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
      if (KeyCloakService.IsLoggedIn()) {
        KeyCloakService.UpdateToken(cb(config));
      }

      return config;
    }
  );
};

const getAxiosClient = (): AxiosInstance => _axios;

const HttpService = {
  HttpMethods,
  configureAxiosKeycloak,
  getAxiosClient,
};

export default HttpService;