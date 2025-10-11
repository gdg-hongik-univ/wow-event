import Text from "./base/Text";

interface FormDescriptionProp {
  venue: string;
  startAt: string;
  applicationDescription: string;
}

const FormDescription = ({
  startAt,
  venue,
  applicationDescription,
}: FormDescriptionProp) => {
  const startDate = new Date(startAt);

  const showDate = `${startDate.getFullYear()}년 ${
    startDate.getMonth() + 1
  }월 ${startDate.getDate()}일 ${startDate.getHours()}시 ${startDate.getMinutes()}분`;

  return (
    <Text style={{ width: "100%" }}>
      {!isNaN(startDate.getTime()) && `행사 일시: ${showDate}`}
      <br />
      {venue && `행사 장소: ${venue}`}
      <br />
      <br />
      {applicationDescription}
    </Text>
  );
};

export default FormDescription;
