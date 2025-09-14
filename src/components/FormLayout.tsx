import { Outlet } from "react-router";
import { GdscLogo } from "wowds-icons";
import Flex from "./Flex";
import Text from "./Text";

const FormLayout = () => {
  return (
    <Flex justify="center">
      <Flex direction="column" width={988} gap={120}>
        <Flex direction="column" gap={28}>
          <GdscLogo width={90} height={44} />
          <Flex direction="column" gap={40}>
            <Text as={"h1"} typo="display1">
              2025-1 GDG 개강총회
            </Text>
            <Text>
              안녕하세요 어쩌구저쩌구입니다. 반가워여.안녕하세요
              어쩌구저쩌구입니다. 반가워여.안녕하세요 어쩌구저쩌구입니다.
              반가워여.안녕하세요 어쩌구저쩌구입니다. 반가워여.안녕하세요
              어쩌구저쩌구입니다. <br />
              <br />
              반가워여.안녕하세요 어쩌구저쩌구입니다. 반가워여.안녕하세요
              어쩌구저쩌구입니다. 반가워여.안녕하세요 어쩌구저쩌구입니다.
              반가워여.
            </Text>
          </Flex>
        </Flex>
        <Outlet />
      </Flex>
    </Flex>
  );
};

export default FormLayout;
