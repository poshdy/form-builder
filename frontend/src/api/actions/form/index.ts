import type {
  FormPayload,
  SaveFormPayload,
  UpdateFormPayload,
} from "@/schemas/form";
import { apiCall } from "@/api";

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
