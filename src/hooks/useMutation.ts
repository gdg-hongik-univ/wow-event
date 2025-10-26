import type { AxiosError } from "axios";
import useSWRMutation from "swr/mutation";
import { eventUpdater } from "../apis/eventUpdater";
import type { ErrorDataType } from "../types/error";
import type { EventApplyDtoType } from "../types/event";

export const useEventMutation = () => {
  const { trigger, isMutating, error } = useSWRMutation<
    any,
    AxiosError<ErrorDataType>,
    string,
    EventApplyDtoType
  >("/participant/event-participations/apply", eventUpdater);
  return { trigger, isMutating, error };
};
