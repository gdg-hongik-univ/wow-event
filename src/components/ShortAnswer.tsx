import { color, typography } from "wowds-tokens";
import BaseAnswer, { type BaseAnswerProps } from "./BaseAnswer";

interface ShortAnswerProps extends BaseAnswerProps {
  placeholder?: string;
}

const ShortAnswer = ({ question, required, placeholder }: ShortAnswerProps) => {
  return (
    <BaseAnswer question={question} required={required}>
      <input
        className="w-[460px] outline-none"
        style={{
          ...typography.body1,
          borderBottom: "solid 1px",
          borderColor: color.outline,
          paddingBottom: "8px",
        }}
        placeholder={placeholder || "답변을 입력해주세요."}
      />
    </BaseAnswer>
  );
};

export default ShortAnswer;
