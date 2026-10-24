import axios from "axios";

export function getErrorMessage(error: unknown, fallback: string) {
  if (!axios.isAxiosError(error)) {
    return error instanceof Error ? error.message : fallback;
  }

  const message = error.response?.data?.error;
  if (typeof message === "string") return message;
  return typeof message?.message === "string" ? message.message : fallback;
}
