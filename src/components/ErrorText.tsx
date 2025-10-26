import { ERROR_MESSAGES } from "../constants/error";
import type { ErrorCodeType } from "../types/error";
import Text from "./base/Text";

interface ErrorTextProp {
  errorCode: ErrorCodeType;
}

const ErrorText = ({ errorCode }: ErrorTextProp) => {
  return (
    <Text style={{ width: "90%", textAlign: "center" }} typo={"body1"}>
      {ERROR_MESSAGES[errorCode]}
    </Text>
  );
};

export default ErrorText;
