import { useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { color, typography } from "wowds-tokens";
import Text from "../base/Text";
import BaseAnswer, { type BaseAnswerProps } from "./BaseAnswer";

interface ShortAnswerProps extends BaseAnswerProps {
  placeholder?: string;
  register: UseFormRegisterReturn;
  validation?: RegExp;
}

const ShortAnswer = ({
  question,
  required,
  placeholder,
  register,
  validation,
}: ShortAnswerProps) => {
  const [error, setError] = useState(false);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!validation) return;
    const value = e.target.value;
    if (!value) {
      setError(false);
      return;
    }
    setError(!validation.test(value));
  };

  return (
    <BaseAnswer question={question} required={required}>
      <div style={{ width: "100%" }}>
        <input
          style={{
            ...typography.body1,
            width: "100%",
            outlineStyle: "none",
            borderBottom: "solid 1px",
            borderColor: error ? color.error : color.outline,
            paddingBottom: "8px",
          }}
          autoComplete="off"
          placeholder={placeholder || "답변을 입력해주세요."}
          {...register}
          onBlur={handleBlur}
        />
        {error && (
          <Text typo="body3" color="error" style={{ marginTop: 4 }}>
            양식을 확인해주세요
          </Text>
        )}
      </div>
    </BaseAnswer>
  );
};

export default ShortAnswer;
