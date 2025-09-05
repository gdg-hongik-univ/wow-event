import { useNavigate } from "react-router";
import Button from "wowds-ui/Button";
import Flex from "../components/Flex";
import Text from "../components/Text";
import { RoutePath } from "../routes/routePath";

export default function NotFoundErrorPage() {
  const navigate = useNavigate();

  const handleClickNavigateToHome = () => navigate(RoutePath.Index);

  return (
    <Flex direction="column">
      <Text>페이지를 찾을 수 없습니다.</Text>
      <Button onClick={handleClickNavigateToHome}>홈으로 돌아가기</Button>
    </Flex>
  );
}
