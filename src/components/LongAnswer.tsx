import { color, typography } from "wowds-tokens";
import BaseAnswer, { type BaseAnswerProps } from "./BaseAnswer";

interface LongAnswerProps extends BaseAnswerProps {}

const LongAnswer = ({
  number,
  question,
  description,
  required,
}: LongAnswerProps) => {
  return (
    <BaseAnswer
      number={number}
      question={question}
      description={description}
      required={required}
    >
      <textarea
        className="w-full outline-none"
        style={{
          ...typography.body1,
          borderBottom: "solid 1px",
          borderColor: color.outline,
          fieldSizing: "content",
          resize: "none",
        }}
        placeholder="답변을 입력해주세요."
      ></textarea>
    </BaseAnswer>
  );
};

export default LongAnswer;
