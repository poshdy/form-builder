import appConfig from "@/app.config";
import axios from "axios";

import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

export const apiCall = axios.create({
  baseURL: appConfig.apiBaseUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiCall.interceptors.request.use(async (config) => {
  const userStore = await import("@/store/use-user");

  let store = userStore.useUser.getState();

  let accessToken = store.user?.accessToken;

  config.headers.Authorization = `Bearer ${accessToken}`;

  const decodedToken = jwtDecode(accessToken as string);

  const isExipired =
    dayjs.unix(decodedToken.exp as number).diff(dayjs(), "minutes") < 1;

  if (!isExipired) return config;

  const newAccessToken = await store.refreshToken();

  config.headers.Authorization = `Bearer ${newAccessToken}`;
  return config;
});
