import type { AxiosError } from "axios";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { eventUpdater } from "../apis/eventUpdater";
import { fetcher } from "../apis/fetcher";
import type { ErrorDataType } from "../types/error";
import type { EventApplyDtoType, EventDtoType } from "../types/event";

export const useEvent = () => {
  const eventFetcher = (eventId: string | undefined) => {
    const eventFetcher = useSWR<EventDtoType, AxiosError<ErrorDataType>>(
      eventId ? `/common/events/${eventId}` : null,
      fetcher,
      { errorRetryCount: 2, errorRetryInterval: 5000 }
    );
    return eventFetcher;
  };

  const submitEventMutation = useSWRMutation<
    any,
    AxiosError<ErrorDataType>,
    string,
    EventApplyDtoType
  >("/participant/event-participations/apply", eventUpdater);

  return { eventFetcher, submitEventMutation };
};
