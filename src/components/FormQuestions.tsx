import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import { color } from "wowds-tokens";
import Button from "wowds-ui/Button";
import { VALIDATION_PATTERNS } from "../constants/validation";
import { useEventMutation } from "../hooks/useMutation";
import { useResponsive } from "../hooks/useResponsive";
import type { ErrorCodeType } from "../types/error";
import type { EventApplyDtoType, EventDtoType } from "../types/event";
import ShortAnswer from "./answer/ShortAnswer";
import SingleAnswer from "./answer/SingleAnswer";
import Flex from "./base/Flex";
import Text from "./base/Text";

interface FormQuestionProp {
  event: EventDtoType;
  errorHandler: (errorCode: ErrorCodeType) => void;
}

const FormQuestions = ({ event, errorHandler }: FormQuestionProp) => {
  const { isMobile } = useResponsive();
  const [noticeConfirmed, setNoticeConfirmed] = useState("false");
  const [pageNum, setPageNum] = useState(0);
  const { register, watch, setValue, handleSubmit } =
    useFormContext<EventApplyDtoType>();

  const name = watch("participant.name");
  const studentId = watch("participant.studentId");
  const phone = watch("participant.phone");
  const afterPartyApplicationStatus = watch("afterPartyApplicationStatus");

  const { trigger, isMutating } = useEventMutation();

  const isValid = {
    personal: !!(
      name &&
      studentId &&
      phone &&
      VALIDATION_PATTERNS.studentId.test(studentId) &&
      VALIDATION_PATTERNS.phone.test(phone)
    ),
    etc:
      (afterPartyApplicationStatus === "NONE" || afterPartyApplicationStatus) &&
      noticeConfirmed === "true",
  };

  useEffect(() => {
    if (
      event?.noticeConfirmQuestionStatus === "DISABLED" ||
      !event?.noticeConfirmQuestionStatus
    )
      setNoticeConfirmed("true");
  }, [event, afterPartyApplicationStatus]);

  const questionPagination = (page: number) => {
    switch (page) {
      case 0:
        return (
          <>
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
              validation={VALIDATION_PATTERNS.studentId}
              register={register("participant.studentId")}
            />
            <ShortAnswer
              question="전화번호를 입력해주세요."
              required
              placeholder="Ex. 01012345678"
              validation={VALIDATION_PATTERNS.phone}
              register={register("participant.phone")}
            />
          </>
        );
      case 1:
        return (
          <>
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
                  setValue("afterPartyApplicationStatus", value);
                }}
                required
              />
            )}
            {event.rsvpQuestionStatus === "ENABLED" && (
              <SingleAnswer
                question="bevy 페이지에 가입하신 분은 RSVP를 등록해주세요."
                options={["등록 완료했습니다."]}
              />
            )}
          </>
        );
      case 2:
        return (
          <Flex
            direction="column"
            gap={"xs"}
            bgColor="backgroundNormal"
            padding={30}
            radius={"xs"}
          >
            <hr
              style={{
                height: "1px",
                border: "none",
                backgroundColor: color.primary,
                marginBottom: "16px",
              }}
            />
            <Text as={"h1"} typo={isMobile ? "h2" : "h1"}>
              뒤풀이 관련 안내
            </Text>
            <Text typo={isMobile ? "body2" : "body1"}>
              뒤풀이를 진행하기에 앞서 선입금비를 받고 있어요. 아래 계좌로
              선입금비를 납부해주세요.
              <br /> 선입금비를 납부하지 않을 경우에는 뒤풀이 신청이 취소될 수
              있으니 주의해주세요.
              <br /> 뒤풀이 선입금비 환불에 관한 규정은{" "}
              <a
                href="https://www.gdschongik.com/onboarding/no-show"
                style={{ textDecorationLine: "underline" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                GDG 노쇼 규정
              </a>
              을 참고해주세요.
              <br />
              <br />
              계좌번호: 토스뱅크 1002-1478-8186 (예금주: 김동현(모임통장))
            </Text>
          </Flex>
        );
    }
  };

  return (
    <Flex direction="column" gap={60} align="center">
      {questionPagination(pageNum)}
      <Flex gap={"lg"}>
        {pageNum > 0 && (
          <Button
            style={isMobile ? { width: 80, height: 40 } : { width: 120 }}
            variant="outline"
            onClick={() => setPageNum((prev) => (prev -= 1))}
          >
            이전
          </Button>
        )}
        {((event.noticeConfirmQuestionStatus === "ENABLED" ||
          afterPartyApplicationStatus !== "NONE" ||
          event.rsvpQuestionStatus === "ENABLED") &&
          pageNum === 0) ||
        (afterPartyApplicationStatus === "APPLIED" &&
          event.prePaymentStatus === "ENABLED" &&
          pageNum === 1) ? (
          <Button
            disabled={pageNum === 0 ? !isValid.personal : !isValid.etc}
            style={isMobile ? { width: 80, height: 40 } : { width: 120 }}
            onClick={() => {
              setPageNum((prev) => (prev += 1));
            }}
          >
            다음
          </Button>
        ) : (
          <Button
            disabled={!isValid.etc || isMutating}
            style={isMobile ? { width: 80, height: 40 } : { width: 120 }}
            onClick={handleSubmit(async (data) => {
              await trigger(data, {
                onError: (error) => {
                  if (
                    event?.regularRoleOnlyStatus === "ENABLED" &&
                    error?.response?.data.errorCodeName ===
                      "EVENT_NOT_APPLICABLE_NOT_REGULAR_ROLE"
                  ) {
                    errorHandler(error?.response?.data.errorCodeName);
                  } else if (
                    error.response?.data.errorCodeName ===
                    "PARTICIPATION_DUPLICATE"
                  ) {
                    errorHandler(error?.response?.data.errorCodeName);
                  }
                  throw error;
                },
              });
            })}
          >
            제출
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default FormQuestions;
