import { apiClient } from ".";

export const fetcher = (url: string, { signal }: { signal: AbortSignal }) =>
  apiClient.get(url, { signal }).then((res) => res.data);
