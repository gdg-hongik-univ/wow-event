import { useResponsive } from "../hooks/useResponsive";
import Flex from "./base/Flex";
import Text from "./base/Text";
import ReactMarkdown from "react-markdown";

interface FormDescriptionProp {
  venue: string;
  startAt: string;
  description: string;
}

const FormDescription = ({
  startAt,
  venue,
  description,
}: FormDescriptionProp) => {
  const { isMobile } = useResponsive();

  const startDate = new Date(startAt);

  const showDate = `${startDate.getFullYear()}년 ${
    startDate.getMonth() + 1
  }월 ${startDate.getDate()}일 ${startDate.getHours()}시 ${startDate.getMinutes()}분`;

  return (
    <>
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
          {venue && `행사 장소: ${venue}`}
        </Text>
        <Text
          style={{
            width: "100%",
            whiteSpace: "break-spaces",
            backgroundColor: "#FFFFFF",
            padding: isMobile ? 16 : 24,
            borderRadius: 8,
          }}
          typo={isMobile ? "body2" : "body1"}
        >
          <ReactMarkdown>{description}</ReactMarkdown>
        </Text>
      </Flex>
    </>
  );
};

export default FormDescription;
