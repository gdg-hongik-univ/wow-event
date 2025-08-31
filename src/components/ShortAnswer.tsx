import { color, typography } from "wowds-tokens";
import BaseAnswer, { type BaseAnswerProps } from "./BaseAnswer";

interface ShortAnswerProps extends BaseAnswerProps {}

const ShortAnswer = ({
  number,
  question,
  description,
  required,
}: ShortAnswerProps) => {
  return (
    <BaseAnswer
      number={number}
      question={question}
      description={description}
      required={required}
    >
      <input
        className="w-[460px] outline-none"
        style={{
          ...typography.body1,
          borderBottom: "solid 1px",
          borderColor: color.outline,
        }}
        placeholder="답변을 입력해주세요."
      />
    </BaseAnswer>
  );
};

export default ShortAnswer;
