import type { ErrorCodeType } from "../types/error";
import Text from "./base/Text";

interface ErrorTextProp {
  errorCode: ErrorCodeType;
}
const ErrorMessages: Record<ErrorCodeType, string> = {
  EVENT_NOT_FOUND: "존재하지 않는 행사예요.",
  EVENT_NOT_VIEWABLE_OUTSIDE_APPLICATION_PERIOD: "신청 기간이 지난 행사예요.",
  EVENT_NOT_VIEWABLE_MAX_APPLICANT_COUNT_EXCEEDED:
    "선착순으로 신청이 마감되었어요. 추가 신청이 있을 경우 디스코드를 통해 안내해드릴 예정이니 공지 확인해주세요.",
  PARTICIPATION_DUPLICATE:
    "이미 신청한 행사예요. 변경사항이 있을 경우 카카오톡 플러스채널을 통해 문의해주세요.",
  EVENT_NOT_APPLICABLE_NOT_REGULAR_ROLE: "정회원만 신청 가능한 행사예요.",
};

const ErrorText = ({ errorCode }: ErrorTextProp) => {
  return (
    <Text style={{ width: "90%", textAlign: "center" }} typo={"body1"}>
      {ErrorMessages[errorCode]}
    </Text>
  );
};

export default ErrorText;
