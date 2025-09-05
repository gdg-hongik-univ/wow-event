import { color } from "wowds-tokens";
import Button from "wowds-ui/Button";
import Flex from "../components/Flex";
import Text from "../components/Text";
const SignInPage = () => {
  return (
    <Flex direction="column" gap={60}>
      <Flex
        direction="column"
        padding={30}
        gap="lg"
        radius="xs"
        bgColor="backgroundNormal"
      >
        <div
          style={{
            width: "100%",
            height: 2,
            backgroundColor: color.primary,
          }}
        />
        <Flex direction="column">
          <Text as="h1" typo="h1">
            로그인하여 폼을 작성해주세요.
          </Text>
          <Text typo="body0" color="sub">
            GDG On Campus Hongik Univ. 활동 신청을 위해서는 로그인이 필요해요.
          </Text>
        </Flex>
      </Flex>
      <Flex gap="lg">
        <Button
          style={{
            backgroundColor: color.github,
          }}
          icon={
            <img
              src="images/github-logo-white.svg"
              alt="github-logo"
              width={18}
              height={18}
            />
          }
        >
          GitHub 로그인
        </Button>
        <Button onClick={() => {}}>로그인 없이 작성하기</Button>
      </Flex>
    </Flex>
  );
};

export default SignInPage;
