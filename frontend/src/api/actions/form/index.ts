import type {
  FormPayload,
  SaveFormPayload,
  UpdateFormPayload,
} from "@/schemas/form";
import { apiCall } from "@/api";
import axios from "axios";
import appConfig from "@/app.config";

export const createForm = async (payload: FormPayload) => {
  try {
    const response = await apiCall.post("/forms", {
      title: payload.title,
      description: payload.description,
    });

    return response.data;
  } catch (error) {
    console.error({ error });
  }
};
export const updateForm = async (id: string, payload: UpdateFormPayload) => {
  try {
    const response = await apiCall.patch(`/forms/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error({ error });
  }
};
export const saveForm = async (id: string, payload: SaveFormPayload) => {
  try {
    const response = await apiCall.patch(`/forms/save/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error({ error });
  }
};
export const submitForm = async (id: string, values: string) => {
  try {
    const response = await axios.post(
      `${appConfig.apiBaseUrl}/forms/submission/${id}`,
      { values }
    );
    return response.data;
  } catch (error) {
    console.error({ error });
  }
};
