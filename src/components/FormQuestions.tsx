import type { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import Button from "wowds-ui/Button";
import { useEventMutation } from "../hooks/useMutation";
import type { EventApplyDtoType, EventDtoType } from "../types/event";
import ShortAnswer from "./answer/ShortAnswer";
import SingleAnswer from "./answer/SingleAnswer";
import Flex from "./base/Flex";

interface FormQuestionProp {
  event: EventDtoType;
  modalHandler: () => void;
}

const FormQuestions = ({ event, modalHandler }: FormQuestionProp) => {
  const [noticeConfirmed, setNoticeConfirmed] = useState("false");
  const [prePaymentConfirmed, setPrePaymentConfirmed] = useState("false");

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = useFormContext<EventApplyDtoType>();

  const name = watch("participant.name");
  const studentId = watch("participant.studentId");
  const phone = watch("participant.phone");
  const afterPartyApplicationStatus = watch("afterPartyApplicationStatus");

  const { trigger, isMutating } = useEventMutation();

  const isValid =
    name &&
    studentId &&
    phone &&
    (afterPartyApplicationStatus === "NONE" || afterPartyApplicationStatus) &&
    prePaymentConfirmed === "true" &&
    noticeConfirmed === "true";

  useEffect(() => {
    if (
      event?.noticeConfirmQuestionStatus === "DISABLED" ||
      !event?.noticeConfirmQuestionStatus
    )
      setNoticeConfirmed("true");
    if (
      event?.prePaymentStatus === "DISABLED" ||
      afterPartyApplicationStatus === "NOT_APPLIED" ||
      afterPartyApplicationStatus === "NONE"
    ) {
      setPrePaymentConfirmed("true");
    }
  }, [event, afterPartyApplicationStatus]);

  return (
    <Flex direction="column" gap={60} align="center" style={{}}>
      <ShortAnswer
        question="이름을 입력해주세요."
        required
        placeholder="Ex. 홍길동"
        register={register("participant.name")}
      />
      <ShortAnswer
        question="학번을 입력해주세요."
        required
        placeholder="Ex. C123456"
        register={register("participant.studentId")}
      />
      <ShortAnswer
        question="전화번호를 입력해주세요."
        required
        placeholder="Ex. 01012345678"
        register={register("participant.phone")}
      />
      {event.noticeConfirmQuestionStatus === "ENABLED" && (
        <SingleAnswer
          question="유의사항을 확인하셨나요?"
          options={["예, 확인했습니다."]}
          optionValues={["true"]}
          value={noticeConfirmed}
          required
          onChange={() => setNoticeConfirmed("true")}
        />
      )}
      {afterPartyApplicationStatus !== "NONE" && (
        <SingleAnswer
          question="뒤풀이에 참여하시나요?"
          options={["참여합니다.", "참여하지 않습니다."]}
          optionValues={["APPLIED", "NOT_APPLIED"]}
          value={afterPartyApplicationStatus}
          onChange={(value) => {
            if (value === "APPLIED") setPrePaymentConfirmed("false");
            setValue("afterPartyApplicationStatus", value);
          }}
          required
        />
      )}
      {afterPartyApplicationStatus === "APPLIED" &&
        event.prePaymentStatus === "ENABLED" && (
          <SingleAnswer
            question="선입금을 완료하였나요?"
            options={["예, 완료했습니다."]}
            optionValues={["true"]}
            value={prePaymentConfirmed}
            required
            onChange={() => setPrePaymentConfirmed("true")}
          />
        )}
      {event.rsvpQuestionStatus === "ENABLED" && (
        <SingleAnswer
          question="bevy 페이지에 가입하신 분은 RSVP를 등록해주세요."
          options={["등록 완료했습니다."]}
        />
      )}
      <Flex>
        <Button
          disabled={!isValid || isMutating}
          style={{ width: 120 }}
          onClick={handleSubmit((data) => {
            trigger(data).catch(
              (
                error: AxiosError<{
                  errorCodeName: string;
                  errorMessage: string;
                }>
              ) => {
                if (
                  event?.regularRoleOnlyStatus === "ENABLED" &&
                  error?.response?.data.errorCodeName ===
                    "EVENT_NOT_APPLICABLE_NOT_REGULAR_ROLE"
                ) {
                  modalHandler();
                } else if (
                  error.response?.data.errorCodeName ===
                  "PARTICIPATION_DUPLICATE"
                ) {
                  modalHandler();
                }
              }
            );
          })}
        >
          제출
        </Button>
      </Flex>
    </Flex>
  );
};

export default FormQuestions;
