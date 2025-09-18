import type { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { GdscLogo } from "wowds-icons";
import Button from "wowds-ui/Button";
import { eventUpdater } from "../apis/eventUpdater";
import { fetcher } from "../apis/fetcher";
import ShortAnswer from "../components/answer/ShortAnswer";
import SingleAnswer from "../components/answer/SingleAnswer";
import Flex from "../components/base/Flex";
import Text from "../components/base/Text";
import MemberAuthModal from "../components/MemberAuthModal";
import type { EventApplyDtoType, EventDtoType } from "../types/event";

const FormPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { trigger, error: mutationError } = useSWRMutation<
    any,
    AxiosError,
    string,
    EventApplyDtoType
  >("/participant/event-participations/apply", eventUpdater);
  const { data: eventData, error: fetchError } = useSWR<EventDtoType>(
    `/participant/events/${eventId}`,
    fetcher
  );
  const startDate = eventData && new Date(eventData.startAt);
  const showDate =
    startDate &&
    `${startDate.getFullYear()}년 ${
      startDate.getMonth() + 1
    }월 ${startDate.getDate()}일 ${startDate.getHours()}시 ${startDate.getMinutes()}분`;

  const { register, watch, setValue, handleSubmit } =
    useFormContext<EventApplyDtoType>();
  const watchedData = watch();
  const {
    participant: { name, studentId, phone },
    afterPartyApplicationStatus,
  } = watchedData;

  const [noticeConfirmed, setNoticeConfirmed] = useState<boolean | undefined>(
    undefined
  );
  const [prepaymentConfirmed, setPrepaymentConfirmed] = useState<
    boolean | undefined
  >(undefined);
  const [rsvpConfirmed, setRsvpConfirmed] = useState<boolean | undefined>(
    undefined
  );
  const [showMemberAuthModal, setShowMemberAuthModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (eventData) {
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
        return;
      }

      if (eventData.afterPartyStatus === "DISABLED")
        setValue("afterPartyApplicationStatus", "NONE");
      if (
        noticeConfirmed === undefined &&
        eventData.noticeConfirmQuestionStatus === "ENABLED"
      )
        setNoticeConfirmed(false);
      if (
        afterPartyApplicationStatus === "APPLIED" &&
        prepaymentConfirmed === undefined &&
        eventData.prePaymentStatus === "ENABLED"
      )
        setPrepaymentConfirmed(false);

      if (
        rsvpConfirmed === undefined &&
        eventData.rsvpQuestionStatus === "ENABLED"
      )
        setRsvpConfirmed(false);
      if (watchedData.eventId === undefined)
        setValue("eventId", eventData.eventId);
    }
  }, [eventData, watchedData, mutationError]);

  const isValid =
    name &&
    studentId &&
    phone &&
    (afterPartyApplicationStatus === "NONE" || afterPartyApplicationStatus) &&
    (noticeConfirmed === undefined || noticeConfirmed) &&
    (prepaymentConfirmed === undefined || prepaymentConfirmed);

  return fetchError ? (
    <Flex direction="column" justify="center" align="center">
      <Text>존재하지 않는 폼입니다.</Text>
    </Flex>
  ) : (
    eventData && (
      <Flex justify="center">
        {showMemberAuthModal && (
          <MemberAuthModal onClose={() => setShowMemberAuthModal(false)} />
        )}
        <Flex direction="column" width={988} gap={120}>
          <Flex direction="column" gap={28}>
            <GdscLogo width={90} height={44} />
            <Flex direction="column" gap={40}>
              <Text as={"h1"} typo="display1">
                {eventData.name}
              </Text>
              {!isSubmitted && (
                <Text>
                  행사 일시: {showDate}
                  <br />
                  행사 장소: {eventData.venue}
                  <br />
                  <br />
                  {eventData.applicationDescription}
                </Text>
              )}
            </Flex>
          </Flex>

          {isSubmitted ? (
            <Text>응답이 기록되었습니다.</Text>
          ) : (
            <Flex direction="column" gap={60}>
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
                placeholder="Ex. 010-1234-5678"
                register={register("participant.phone")}
              />
              {noticeConfirmed !== undefined && (
                <SingleAnswer
                  question="유의사항을 확인하셨나요?"
                  options={["예, 확인했습니다."]}
                  optionValues={["true"]}
                  value={noticeConfirmed?.toString()}
                  required
                  onChange={(value) => {
                    setNoticeConfirmed(value);
                  }}
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
                    if (value === "NOT_APPLIED")
                      setPrepaymentConfirmed(undefined);
                  }}
                  required
                />
              )}
              {afterPartyApplicationStatus === "APPLIED" &&
                prepaymentConfirmed !== undefined && (
                  <SingleAnswer
                    question="선입금을 완료하였나요?"
                    options={["예, 완료했습니다."]}
                    optionValues={["true"]}
                    value={prepaymentConfirmed?.toString()}
                    required
                    onChange={(value) => {
                      setPrepaymentConfirmed(value);
                    }}
                  />
                )}
              {rsvpConfirmed !== undefined && (
                <SingleAnswer
                  question="bevy 페이지에 가입하신 분은 RSVP를 등록해주세요."
                  options={["등록 완료했습니다."]}
                  optionValues={["true"]}
                  value={rsvpConfirmed?.toString()}
                  onChange={(value) => {
                    setRsvpConfirmed(value);
                  }}
                />
              )}
              <Flex gap="lg">
                <Button
                  disabled={!isValid}
                  style={{ width: 120 }}
                  onClick={handleSubmit((data) => {
                    trigger(data)
                      .then(() => {
                        setIsSubmitted(true);
                      })
                      .catch((error) => {
                        if (
                          eventData?.regularRoleOnlyStatus === "ENABLED" &&
                          error?.status === 409
                        ) {
                          setShowMemberAuthModal(true);
                        }
                      });
                  })}
                >
                  제출
                </Button>
              </Flex>
            </Flex>
          )}
        </Flex>
      </Flex>
    )
  );
};

export default FormPage;
