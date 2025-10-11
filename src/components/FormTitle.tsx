import { GdscLogo } from "wowds-icons";
import { useResponsive } from "../hooks/useResponsive";
import Flex from "./base/Flex";
import Text from "./base/Text";

interface FormTitleProp {
  title: string;
}

const FormTitle = ({ title }: FormTitleProp) => {
  const { isMobile } = useResponsive();
  return (
    <Flex width={"100%"} direction="column" align="center" className="title">
      <Flex
        width={"min(988px, 90%)"}
        direction={isMobile ? "row" : "column"}
        gap={isMobile ? 8 : 28}
        style={{ paddingTop: 16, paddingBottom: 16 }}
      >
        <GdscLogo width={isMobile ? 49 : 90} height={isMobile ? 24 : 44} />
        <Text as={"h1"} typo={isMobile ? "h3" : "display1"}>
          {title}
        </Text>
      </Flex>
    </Flex>
  );
};

export default FormTitle;
