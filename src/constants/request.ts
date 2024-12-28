import axios from "axios";
import { STORAGE_KEYS } from "./storage-keys";

const BASE_URL = "https://us-central1-conversa-pro.cloudfunctions.net/api";
// const BASE_URL = "http://localhost:3000";

export const request = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

request.interceptors.request.use(async (config) => {
  const accessToken = await chrome.storage.local.get(STORAGE_KEYS.ACCESS_TOKEN);
  if (accessToken.accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken.accessToken}`;
  }
  return config;
});

request.interceptors.response.use(null, (error) => {
  if (error.response && error.response.status === 401) {
    chrome.storage.local.remove(STORAGE_KEYS.IS_ENABLED);
    chrome.storage.local.remove(STORAGE_KEYS.ACCESS_TOKEN);
  }
  return Promise.reject(error);
});
