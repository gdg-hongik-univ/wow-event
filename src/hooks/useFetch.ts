import useSWR from "swr";
import { fetcher } from "../apis/fetcher";
import type { EventDtoType } from "../types/event";

export const useEventFetcher = (eventId: string | undefined) => {
  const { data, error } = useSWR<EventDtoType>(
    eventId ? `/participant/events/${eventId}` : null,
    fetcher
  );
  return { data, error };
};
