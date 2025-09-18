import { type PropsWithChildren } from "react";
import Flex from "../base/Flex";
import Text from "../base/Text";

export interface BaseAnswerProps extends PropsWithChildren {
  question: string;
  required?: boolean;
}

const BaseAnswer = ({ question, required, children }: BaseAnswerProps) => {
  return (
    <Flex
      direction="column"
      padding={40}
      gap="lg"
      radius="xs"
      width={988}
      bgColor="backgroundNormal"
    >
      <Flex direction="column">
        <Flex gap="sm">
          <Text as="h2" typo="h2">
            {question}
          </Text>
          {required && (
            <Text typo="body2" color="primary">
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
