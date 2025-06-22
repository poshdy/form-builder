import appConfig from "@/app.config";
import type { loginPayload, signUpPayload } from "@/schemas/auth";
import { apiCall } from "@/api/axios-client";
import axios, { isAxiosError } from "axios";

export const signUp = async (values: signUpPayload) => {
  try {
    const response = await axios.post(
      `${appConfig.apiBaseUrl}/authentication/register`,
      values,
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error({
        message: error.message,
        name: error.name,
        code: error.code,
        status: error.status,
      });
    }
  }
};

export const signIn = async (values: loginPayload) => {
  try {
    const response = await axios.post(
      `${appConfig.apiBaseUrl}/authentication/login`,
      values,
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error({
        message: error.message,
        name: error.name,
        code: error.code,
        status: error.status,
      });
    }
  }
};

export const logOut = async () => {
  try {
    const response = await apiCall.get(
      `${appConfig.apiBaseUrl}/authentication/login`
    );

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error({
        message: error.message,
        name: error.name,
        code: error.code,
        status: error.status,
      });
    }
  }
};
