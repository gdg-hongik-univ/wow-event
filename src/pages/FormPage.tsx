import { useNavigate } from "react-router";
import Button from "wowds-ui/Button";
import Flex from "../components/Flex";
import SingleAnswer from "../components/SingleAnswer";
import { RoutePath } from "../routes/routePath";

const FormPage = () => {
  const navigate = useNavigate();
  return (
    <Flex direction="column" gap={60}>
      <SingleAnswer
        question="유의사항을 확인하셨나요?"
        options={["예, 확인했습니다."]}
        required
      />
      <SingleAnswer
        question="뒤풀이에 참여하시나요?"
        options={["참여합니다.", "참여하지 않습니다."]}
        required
      />
      <SingleAnswer
        question="선입금을 완료하였나요?"
        options={["예, 완료했습니다."]}
        required
      />
      <Flex gap="lg">
        <Button
          variant="outline"
          disabled={false}
          style={{ width: 120 }}
          onClick={() => {
            navigate(RoutePath.Info);
          }}
        >
          뒤로
        </Button>
        <Button disabled={false} style={{ width: 120 }} onClick={() => {}}>
          제출
        </Button>
      </Flex>
    </Flex>
  );
};

export default FormPage;
