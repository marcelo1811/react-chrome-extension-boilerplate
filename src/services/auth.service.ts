import { apiRoutes } from "@/constants/apiRoute";
import { request } from "@/constants/request";
import { STORAGE_KEYS } from "@/constants/storage-keys";
import { AxiosResponse } from "axios";

function loginUser(
  email: string,
  password: string
): Promise<AxiosResponse<{ accessToken: string }>> {
  return request.post(apiRoutes.login(), { email, password });
}

function logoutUser() {
  chrome.storage.local.remove(STORAGE_KEYS.ACCESS_TOKEN);
  chrome.storage.local.remove(STORAGE_KEYS.IS_ENABLED);
}

export const AuthService = {
  loginUser,
  logoutUser,
};
