import appConfig from "@/app.config";
import axios from "axios";
import { useUser } from "@/store/use-user";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

const user = useUser.getState().user;
const refreshToken = useUser.getState().refreshToken;

export const apiCall = axios.create({
  baseURL: appConfig.apiBaseUrl,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${user?.accessToken}`,
  },
});

apiCall.interceptors.request.use(async (config) => {
  const accessToken = user?.accessToken;
  if (!accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  const decodedToken = jwtDecode(accessToken as string);

  const isExipired =
    dayjs.unix(decodedToken.exp as number).diff(dayjs(), "minutes") < 1;

  if (!isExipired) return config;

  const newAccessToken = await refreshToken();

  config.headers.Authorization = `Bearer ${newAccessToken}`;
  return config;
});
