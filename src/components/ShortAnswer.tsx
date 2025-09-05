import { color, typography } from "wowds-tokens";
import BaseAnswer, { type BaseAnswerProps } from "./BaseAnswer";

type ShortAnswerProps = BaseAnswerProps;

const ShortAnswer = ({ question, required }: ShortAnswerProps) => {
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
        placeholder="답변을 입력해주세요."
      />
    </BaseAnswer>
  );
};

export default ShortAnswer;
