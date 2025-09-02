import { color, typography } from "wowds-tokens";
import BaseAnswer, { type BaseAnswerProps } from "./BaseAnswer";

interface LongAnswerProps extends BaseAnswerProps {}

const LongAnswer = ({ question, required }: LongAnswerProps) => {
  return (
    <BaseAnswer question={question} required={required}>
      <textarea
        className="w-full outline-none"
        style={{
          ...typography.body1,
          borderBottom: "solid 1px",
          borderColor: color.outline,
          paddingBottom: "8px",
          fieldSizing: "content",
          resize: "none",
        }}
        placeholder="답변을 입력해주세요."
      ></textarea>
    </BaseAnswer>
  );
};

export default LongAnswer;
