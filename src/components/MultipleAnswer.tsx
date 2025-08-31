import { useRef } from "react";
import { color, typography } from "wowds-tokens";
import Checkbox from "wowds-ui/Checkbox";
import BaseAnswer, { type BaseAnswerProps } from "./BaseAnswer";
import Flex from "./Flex";
import Text from "./Text";

interface MultipleAnswerProps extends BaseAnswerProps {
  options: string[];
}

const MultipleAnswer = ({
  number,
  question,
  description,
  required,
  options,
}: MultipleAnswerProps) => {
  const textInputRef = useRef<HTMLInputElement>(null);
  return (
    <BaseAnswer
      number={number}
      question={question}
      description={description}
      required={required}
    >
      {options.map((item) => (
        <Checkbox
          value={item}
          label={<Text typo="body1">{item}</Text>}
          style={{ color: color.textBlack }}
        />
      ))}
      <Checkbox
        value="기타"
        onClick={() => {
          textInputRef.current && textInputRef.current.focus();
        }}
        label={
          <Flex gap={4}>
            <Text typo="body1">기타:</Text>
            <input
              ref={textInputRef}
              className="w-[840px] outline-none pointer-events-none"
              style={{
                ...typography.body1,
                borderBottom: "solid 1px",
                borderColor: color.outline,
              }}
              onFocus={(e) => {
                e.target.style.pointerEvents = "auto";
                e.target.style.borderColor = color.sub;
              }}
              onBlur={(e) => {
                e.target.style.pointerEvents = "none";
                e.target.style.borderColor = color.outline;
              }}
            />
          </Flex>
        }
      />
    </BaseAnswer>
  );
};

export default MultipleAnswer;
