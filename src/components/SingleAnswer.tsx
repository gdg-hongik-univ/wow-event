import { useRef } from "react";
import { color, typography } from "wowds-tokens";
import RadioButton from "wowds-ui/RadioButton";
import RadioGroup from "wowds-ui/RadioGroup";
import BaseAnswer, { type BaseAnswerProps } from "./BaseAnswer";
import Flex from "./Flex";
import Text from "./Text";

interface SingleAnswerProps extends BaseAnswerProps {
  options: string[];
  withEtc?: boolean;
}

const SingleAnswer = ({
  question,
  required,
  options,
  withEtc = false,
}: SingleAnswerProps) => {
  const textInputRef = useRef<HTMLInputElement>(null);
  return (
    <BaseAnswer question={question} required={required}>
      <RadioGroup defaultValue="">
        {options.map((item) => (
          <RadioButton
            key={`radio-${item}`}
            value={item}
            style={{ marginBottom: "0.5rem" }}
            label={<Text typo="body1">{item}</Text>}
          />
        ))}
        {withEtc && (
          <RadioButton
            key={`radio-기타`}
            value="기타"
            inputProps={{
              onClick: () => {
                if (textInputRef.current) textInputRef.current.focus();
              },
            }}
            label={
              <Flex gap={4}>
                {<Text typo="body1">기타:</Text>}
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
        )}
      </RadioGroup>
    </BaseAnswer>
  );
};

export default SingleAnswer;
