import type { AxiosError } from "axios";
import useSWR from "swr";
import { fetcher } from "../apis/fetcher";
import type { ErrorDataType } from "../types/error";
import type { EventDtoType } from "../types/event";

export const useEventFetcher = (eventId: string | undefined) => {
  const { data, error } = useSWR<EventDtoType, AxiosError<ErrorDataType>>(
    eventId ? `/participant/events/${eventId}` : null,
    fetcher
  );
  return { data, error };
};
