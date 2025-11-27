import { useResponsive } from "../hooks/useResponsive";
import Text from "./base/Text";

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
    <Text style={{ width: "100%" }} typo={isMobile ? "body2" : "body1"}>
      {!isNaN(startDate.getTime()) && `행사 일시: ${showDate}`}
      <br />
      {venue && `행사 장소: ${venue}`}
      <br />
      <br />
      {description}
    </Text>
  );
};

export default FormDescription;
