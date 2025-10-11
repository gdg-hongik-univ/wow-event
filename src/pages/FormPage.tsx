import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import Flex from "../components/base/Flex";
import Text from "../components/base/Text";
import ErrorModal from "../components/ErrorModal";
import FormDescription from "../components/FormDescription";
import FormQuestions from "../components/FormQuestions";
import FormTitle from "../components/FormTitle";
import { useEventFetcher } from "../hooks/useFetch";
import { useResponsive } from "../hooks/useResponsive";
import type { EventApplyDtoType } from "../types/event";

const FormPage = () => {
  const { isMobile } = useResponsive();
  const { eventId } = useParams();
  const navigate = useNavigate();

  const { data: eventData, error: fetchError } = useEventFetcher(eventId);
  const {
    watch,
    setValue,
    formState: { isSubmitSuccessful },
  } = useFormContext<EventApplyDtoType>();

  const watchedEventId = watch("eventId");
  const [errorModalStatus, setErrorModalStatus] = useState("");

  useEffect(() => {
    if (watchedEventId === undefined && eventData)
      setValue("eventId", eventData.eventId);
    if (eventData?.applicationPeriod) {
      const today = new Date();
      const applicationStartDate = new Date(
        eventData.applicationPeriod.startDate
      );
      const applicationEndDate = new Date(eventData.applicationPeriod.endDate);

      if (today < applicationStartDate || today > applicationEndDate) {
        navigate("/error", {
          state: { message: "이벤트 신청 기간이 아닙니다." },
          replace: true,
        });
      }
    }
    if (eventData?.afterPartyStatus === "DISABLED")
      setValue("afterPartyApplicationStatus", "NONE");
  }, [eventData, watchedEventId]);

  return fetchError ? (
    <Flex direction="column" justify="center" align="center">
      <Text>존재하지 않는 폼입니다.</Text>
    </Flex>
  ) : (
    eventData && (
      <Flex justify="center">
        {errorModalStatus.length !== 0 && (
          <ErrorModal
            onClose={() => setErrorModalStatus("")}
            errorMsg={
              errorModalStatus === "DUPLICATE"
                ? "이미 해당 이벤트를 신청했습니다."
                : undefined
            }
          />
        )}
        <Flex direction="column" align="center" gap={isMobile ? 20 : 40}>
          <FormTitle title={eventData.name} />
          {isSubmitSuccessful ? (
            <Text>성공적으로 신청되었어요.</Text>
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
                modalHandler={() => {
                  setErrorModalStatus("REGULAR");
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
