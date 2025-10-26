import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useParams } from "react-router";
import Flex from "../components/base/Flex";
import Text from "../components/base/Text";
import ErrorModal from "../components/ErrorModal";
import ErrorText from "../components/ErrorText";
import FormDescription from "../components/FormDescription";
import FormQuestions from "../components/FormQuestions";
import FormTitle from "../components/FormTitle";
import { useEventFetcher } from "../hooks/useFetch";
import { useResponsive } from "../hooks/useResponsive";
import type { ErrorCodeType } from "../types/error";
import type { EventApplyDtoType } from "../types/event";

const FormPage = () => {
  const { isMobile } = useResponsive();
  const { eventId } = useParams();

  const { data: eventData, error: fetchError } = useEventFetcher(eventId);
  const {
    watch,
    setValue,
    formState: { isSubmitSuccessful },
  } = useFormContext<EventApplyDtoType>();

  const watchedEventId = watch("eventId");
  const [errorModalStatus, setErrorModalStatus] = useState<
    ErrorCodeType | undefined
  >();

  useEffect(() => {
    if (watchedEventId === undefined && eventData)
      setValue("eventId", eventData.eventId);

    if (eventData?.afterPartyStatus === "DISABLED")
      setValue("afterPartyApplicationStatus", "NONE");
  }, [eventData, watchedEventId]);

  return fetchError?.response?.data.errorCodeName ? (
    <Flex
      direction="column"
      justify="center"
      align="center"
      style={{ paddingTop: 100 }}
    >
      <ErrorText errorCode={fetchError.response.data.errorCodeName} />
    </Flex>
  ) : (
    eventData && (
      <Flex justify="center">
        {errorModalStatus === "EVENT_NOT_APPLICABLE_NOT_REGULAR_ROLE" && (
          <ErrorModal onClose={() => setErrorModalStatus(undefined)} />
        )}
        <Flex direction="column" align="center" gap={isMobile ? 20 : 40}>
          <FormTitle title={eventData.name} />
          {errorModalStatus === "PARTICIPATION_DUPLICATE" ? (
            <Text style={{ width: "min(988px,90%)" }}>
              이미 신청한 행사예요. 변경사항이 있을 경우 카카오톡 플러스채널을
              통해 문의해주세요.
            </Text>
          ) : isSubmitSuccessful ? (
            <Text style={{ width: "min(988px,90%)" }}>
              성공적으로 신청되었어요.
            </Text>
          ) : (
            <Flex
              direction="column"
              align="center"
              width={"min(988px, 90%)"}
              gap={isMobile ? 28 : 120}
            >
              <FormDescription
                startAt={eventData.startAt}
                venue={eventData.venue}
                applicationDescription={eventData.applicationDescription}
              />
              <FormQuestions
                event={eventData}
                errorHandler={(errorCode: ErrorCodeType) => {
                  setErrorModalStatus(errorCode);
                }}
              />
            </Flex>
          )}
        </Flex>
      </Flex>
    )
  );
};

export default FormPage;
