import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useParams } from "react-router";
import Flex from "../components/base/Flex";
import Text from "../components/base/Text";
import ErrorModal from "../components/ErrorModal";
import FormDescription from "../components/FormDescription";
import FormQuestions from "../components/FormQuestions";
import FormTitle from "../components/FormTitle";

import { ERROR_MESSAGES } from "../constants/error";
import { useEvent } from "../hooks/useEvent";
import { useResponsive } from "../hooks/useResponsive";
import type { ErrorCodeType } from "../types/error";
import type { EventApplyDtoType } from "../types/event";

const FormPage = () => {
  const { isMobile } = useResponsive();
  const { eventId } = useParams();

  const { data: eventData } = useEvent(eventId);

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
    if (eventData && new Date(eventData.applicationPeriod.endDate) < new Date())
      setErrorModalStatus("EVENT_NOT_APPLICABLE_OUTSIDE_APPLICATION_PERIOD");
    if (eventData?.afterPartyStatus === "DISABLED")
      setValue("afterPartyApplicationStatus", "NONE");
  }, [eventData, watchedEventId]);

  return (
    eventData && (
      <Flex justify="center">
        {errorModalStatus === "EVENT_NOT_APPLICABLE_NOT_REGULAR_ROLE" && (
          <ErrorModal onClose={() => setErrorModalStatus(undefined)} />
        )}
        <Flex direction="column" align="center" gap={isMobile ? 20 : 40}>
          <FormTitle title={eventData.name} />
          {errorModalStatus &&
          errorModalStatus !== "EVENT_NOT_APPLICABLE_NOT_REGULAR_ROLE" ? (
            <Text style={{ width: "min(988px,90%)" }}>
              {ERROR_MESSAGES[errorModalStatus]}
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
                description={eventData.description}
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
