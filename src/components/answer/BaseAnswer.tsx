import { type PropsWithChildren, type ReactNode } from "react";
import { useResponsive } from "../../hooks/useResponsive";
import Flex from "../base/Flex";
import Text from "../base/Text";

export interface BaseAnswerProps extends PropsWithChildren {
  question: string | ReactNode;
  required?: boolean;
}

const BaseAnswer = ({ question, required, children }: BaseAnswerProps) => {
  const { isMobile } = useResponsive();

  return (
    <Flex
      direction="column"
      padding={40}
      gap="lg"
      radius="xs"
      bgColor="backgroundNormal"
    >
      <Flex direction="column">
        <Flex gap="sm">
          <Text as="h2" typo={isMobile ? "h3" : "h2"}>
            {question}
          </Text>
          {required && (
            <Text typo={isMobile ? "body3" : "body2"} color="primary">
              *필수입력
            </Text>
          )}
        </Flex>
      </Flex>
      {children}
    </Flex>
  );
};

export default BaseAnswer;
