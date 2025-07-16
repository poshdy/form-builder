import { apiCall } from "@/api";
import type { Form, FormStatsWithRate, FormSubmission } from "@/types/forms";
import axios from "axios";

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
    const response = await apiCall.get<{
      data: Form & { submissionRate: number; bounceRate: number };
    }>(`/forms/${formId}`);

    return response.data.data;
  } catch (error) {
    console.error({ error });
  }
};
export const getFormContent = async (formId: string) => {
  try {
    const response = await axios.get<{
      data: Form & { submissionRate: number; bounceRate: number };
    }>(`http://localhost:4000/forms/submission/${formId}/content`);

    return response.data.data;
  } catch (error) {
    console.error({ error });
  }
};

export const getFormSubmissions = async (formId: string) => {
  try {
    const response = await apiCall.get<{
      data: FormSubmission[];
    }>(`/forms/${formId}/submissions`);

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
