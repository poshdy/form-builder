import { apiCall } from "@/api";
import type { Form, FormStatsWithRate } from "@/types/forms";

export const getForms = async () => {
  try {
    const response = await apiCall.get<{ data: Form[] }>("/forms");

    return response.data.data;
  } catch (error) {
    console.error({ error });
  }
};

export const getForm = async (formId: string) => {
  try {
    const response = await apiCall.get<{ data: Form }>(`/forms/${formId}`);

    return response.data.data;
  } catch (error) {
    console.error({ error });
  }
};
export const getFormStats = async () => {
  try {
    const response = await apiCall.get<{ data: FormStatsWithRate }>(
      `/forms/stats`
    );

    return response.data.data;
  } catch (error) {
    console.error({ error });
  }
};
