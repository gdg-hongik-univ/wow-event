import type { CSSProperties, ElementType, PropsWithChildren } from "react";
import { color as colorType, typography as typoType } from "wowds-tokens";

interface TextProps extends PropsWithChildren {
  as?: ElementType;
  typo?: keyof typeof typoType;
  color?: keyof typeof colorType;
  style?: CSSProperties;
}

const Text = ({
  children,
  as: Tag = "p",
  typo = "body1",
  color = "textBlack",
  style,
  ...props
}: TextProps) => {
  return (
    <Tag
      style={{ ...typoType[typo], color: colorType[color], ...style }}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default Text;
