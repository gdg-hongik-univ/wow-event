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
  question,
  required,
  options,
}: MultipleAnswerProps) => {
  const textInputRef = useRef<HTMLInputElement>(null);
  return (
    <BaseAnswer question={question} required={required}>
      {options.map((item) => (
        <Checkbox
          key={`check-${item}`}
          value={item}
          label={<Text typo="body1">{item}</Text>}
          style={{ color: color.textBlack }}
        />
      ))}
      <Checkbox
        key={`check-기타`}
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
