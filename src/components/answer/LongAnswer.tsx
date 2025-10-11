import { color, typography } from "wowds-tokens";
import BaseAnswer, { type BaseAnswerProps } from "./BaseAnswer";

type LongAnswerProps = BaseAnswerProps;

const LongAnswer = ({ question, required }: LongAnswerProps) => {
  return (
    <BaseAnswer question={question} required={required}>
      <textarea
        style={{
          ...typography.body1,
          width: "100%",
          borderBottom: "solid 1px",
          borderColor: color.outline,
          paddingBottom: "8px",
          resize: "none",
          outlineStyle: "none",
        }}
        placeholder="답변을 입력해주세요."
      ></textarea>
    </BaseAnswer>
  );
};

export default LongAnswer;
