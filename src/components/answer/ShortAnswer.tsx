import type { UseFormRegisterReturn } from "react-hook-form";
import { color, typography } from "wowds-tokens";
import BaseAnswer, { type BaseAnswerProps } from "./BaseAnswer";

interface ShortAnswerProps extends BaseAnswerProps {
  placeholder?: string;
  register: UseFormRegisterReturn;
}

const ShortAnswer = ({
  question,
  required,
  placeholder,
  register,
}: ShortAnswerProps) => {
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
        autoComplete="off"
        placeholder={placeholder || "답변을 입력해주세요."}
        {...register}
      />
    </BaseAnswer>
  );
};

export default ShortAnswer;
