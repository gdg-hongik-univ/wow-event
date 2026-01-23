import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { color } from "wowds-tokens";
import { useResponsive } from "../hooks/useResponsive";
import type { EventResponseDtoType } from "../types/event";
import Flex from "./base/Flex";
import Text from "./base/Text";

interface FormDescriptionProp {
  eventData: EventResponseDtoType;
}

const FormDescription = ({ eventData }: FormDescriptionProp) => {
  const { isMobile } = useResponsive();

  const startDate = new Date(eventData.event.startAt);

  const parseUnderline = (md: string) => md.replace(/__(.+?)__/g, "<u>$1</u>");

  const showDate = `${startDate.getFullYear()}년 ${
    startDate.getMonth() + 1
  }월 ${startDate.getDate()}일 ${startDate.getHours()}시 ${startDate.getMinutes()}분`;

  return (
    <Flex direction="column" gap={16} width="100%">
      <Text
        style={{
          width: "100%",
          whiteSpace: "break-spaces",
          backgroundColor: "#FFFFFF",
          padding: isMobile ? 16 : 24,
          borderRadius: 8,
          fontWeight: "700",
        }}
        typo={isMobile ? "body2" : "body1"}
        as="div"
      >
        {!isNaN(startDate.getTime()) && `행사 일시: ${showDate}`}
        <br />
        {eventData.event.venue && `행사 장소: ${eventData.event.venue}`}
      </Text>
      {eventData.event.description && (
        <Text
          style={{
            width: "100%",
            whiteSpace: "break-spaces",
            backgroundColor: "#FFFFFF",
            padding: isMobile ? 16 : 24,
            borderRadius: 8,
          }}
          typo={isMobile ? "body2" : "body1"}
          as="div"
        >
          <div className="markdown">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            >
              {parseUnderline(eventData.event.description)}
            </ReactMarkdown>
          </div>
        </Text>
      )}
      {(eventData.event.afterPartyMaxApplicantCount ||
        eventData.event.mainEventMaxApplicantCount) && (
        <Flex
          direction="column"
          gap={"lg"}
          style={{
            backgroundColor: "#FFFFFF",
            padding: isMobile ? 24 : 40,
            borderRadius: 8,
          }}
          className="markdown"
        >
          {eventData.event.mainEventMaxApplicantCount && (
            <Flex gap={10}>
              <div
                style={{
                  width: 6,
                  borderRadius: "3.3px",
                  background: color.outline,
                }}
              />
              <Text typo={isMobile ? "body2" : "body1"} as={"div"}>
                행사 신청 인원:{" "}
                <Text
                  typo={isMobile ? "body2" : "body1"}
                  as={"strong"}
                  style={{ fontWeight: "bolder" }}
                >
                  {eventData.mainEventCurrentApplicantCount}명
                </Text>
                /{eventData.event.mainEventMaxApplicantCount}명
              </Text>
            </Flex>
          )}
          {eventData.event.afterPartyMaxApplicantCount && (
            <Flex gap={10}>
              <div
                style={{
                  width: 6,
                  borderRadius: "3.3px",
                  background: color.outline,
                }}
              />
              <Text typo={isMobile ? "body2" : "body1"} as={"div"}>
                뒤풀이 신청 인원:{" "}
                <Text
                  typo={isMobile ? "body2" : "body1"}
                  as={"strong"}
                  style={{ fontWeight: "bolder" }}
                >
                  {eventData.afterPartyCurrentApplicantCount}명
                </Text>
                /{eventData.event.afterPartyMaxApplicantCount}명
              </Text>
            </Flex>
          )}
        </Flex>
      )}
    </Flex>
  );
};

export default FormDescription;
