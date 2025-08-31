import { type PropsWithChildren } from "react";
import Flex from "./Flex";
import Text from "./Text";

export interface BaseAnswerProps extends PropsWithChildren {
  number: number;
  question: string;
  description: string;
  required?: boolean;
}

const BaseAnswer = ({
  number,
  question,
  description,
  required,
  children,
}: BaseAnswerProps) => {
  return (
    <Flex direction="column" padding={40} gap="lg" radius="xs" width={988}>
      <Flex direction="column">
        <Flex gap="sm">
          <Text as="h2" typo="h2">
            {`${number}. ${question}`}
          </Text>
          {required && (
            <Text typo="body2" color="primary">
              *필수입력
            </Text>
          )}
        </Flex>
        <Text typo="body1" color="sub">
          {description}
        </Text>
      </Flex>
      {children}
    </Flex>
  );
};

export default BaseAnswer;
