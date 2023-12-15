import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

export class RequestApi {
  private service: AxiosInstance;

  constructor() {
    this.service = axios.create({
      baseURL: "https://cluster.apigratis.com/api/v2"
    });

    this.service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      console.log(`${config.method?.toUpperCase()}: ${config.baseURL}${config.url}`);
      if (config.headers) {
        config.headers["Content-Type"] = "application/json";
      } 
      return config;
    });
    this.service.interceptors.response.use((res) => res.data);
  }

  public getInstance(): AxiosInstance {
    return this.service;
  }
}
