import type { AxiosError } from "axios";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { eventUpdater } from "../apis/eventUpdater";
import { fetcher } from "../apis/fetcher";
import type {
  EventApplyDtoType,
  EventDtoType,
  ParticipantValidationDto,
  ParticipantValidationResponse,
} from "../types/event";

export const useEvent = () => {
  const eventFetcher = (eventId: string | undefined) => {
    const eventFetcher = useSWR<EventDtoType, AxiosError>(
      eventId ? `/common/events/${eventId}` : null,
      fetcher,
      { errorRetryCount: 2, errorRetryInterval: 5000 }
    );
    return eventFetcher;
  };

  const validationMutation = useSWRMutation<
    ParticipantValidationResponse,
    AxiosError,
    string,
    ParticipantValidationDto
  >("/participant/event-participations/validate-applicable", eventUpdater);

  const submitEventMutation = useSWRMutation<
    any,
    AxiosError,
    string,
    EventApplyDtoType
  >("/participant/event-participations/apply", eventUpdater);

  return { eventFetcher, validationMutation, submitEventMutation };
};
