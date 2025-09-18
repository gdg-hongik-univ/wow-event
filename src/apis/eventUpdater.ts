import { apiClient } from ".";
import type { EventApplyDtoType } from "../types/event";

export const eventUpdater = (
  url: string,
  { arg }: { arg: EventApplyDtoType }
) => apiClient.post(url, arg).then((res) => res.data);
