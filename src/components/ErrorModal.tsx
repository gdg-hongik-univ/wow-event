import { useEffect } from "react";
import { Close } from "wowds-icons";
import { color } from "wowds-tokens";
import Button from "wowds-ui/Button";
import { useResponsive } from "../hooks/useResponsive";
import Flex from "./base/Flex";
import Text from "./base/Text";

interface ErrorModalProp {
  onClose: () => void;
}

const ErrorModal = ({ onClose }: ErrorModalProp) => {
  const { isMobile } = useResponsive();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <Flex
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: color.backgroundDimmer,
        overflow: "hidden",
      }}
    >
      <Flex
        width={"min(650px,80%)"}
        bgColor={"backgroundNormal"}
        radius="xs"
        justify="center"
        align="center"
        style={{
          height: isMobile ? "260px" : "450px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%)`,
          textAlign: "center",
          boxSizing: "border-box",
        }}
      >
        {!isMobile && (
          <Close
            width={24}
            height={24}
            stroke="black"
            style={{
              position: "absolute",
              top: 24,
              right: 24,
              cursor: "pointer",
            }}
            onClick={onClose}
          />
        )}
        <Flex direction="column" gap={40} align="center">
          <Flex justify="center">
            <Text typo={isMobile ? "h2" : "h1"}>
              <Text as="span" typo={isMobile ? "h2" : "h1"} color="primary">
                정회원
              </Text>
              만{isMobile && <br />} 신청할 수 있는 행사에요.
            </Text>
          </Flex>
          <Button style={{ width: isMobile ? 80 : 173 }} onClick={onClose}>
            확인
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ErrorModal;
