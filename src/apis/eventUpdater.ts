import { apiClient } from ".";

export const eventUpdater = <T>(url: string, { arg }: { arg: T }) =>
  apiClient.post(url, arg).then((res) => res.data);
