import { useLocation } from "react-router";
import Flex from "../components/base/Flex";
import Text from "../components/base/Text";

const ErrorPage = () => {
  const location = useLocation();
  const message = location.state?.message || "오류가 발생했습니다.";

  return (
    <Flex direction="column" justify="center" align="center">
      <Text>{message}</Text>
    </Flex>
  );
};

export default ErrorPage;
