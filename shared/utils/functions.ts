import { AxiosError } from "axios";
import { BACKEND_ERROR_MESSAGE } from "../constants/backend";

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isAxiosErrorWithMessage(error: unknown): error is AxiosError {
  return (
    typeof error === "object" &&
    error !== null &&
    "isAxiosError" in error &&
    (error as AxiosError).isAxiosError === true
  );
}

export function getErrorMessage(error: unknown): string {
  if (isAxiosErrorWithMessage(error)) {
    const axiosError = error as AxiosError<{ error?: string }>;
    return axiosError.response?.data?.error || axiosError.message;
  }

  if (error instanceof Error) return error.message;

  if (typeof error === "string") return error;
  try {
    return JSON.stringify(error);
  } catch {
    return BACKEND_ERROR_MESSAGE;
  }
}
