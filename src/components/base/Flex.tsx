import type { CSSProperties, HTMLAttributes } from "react";
import { color as wowColor, space as wowSpace } from "wowds-tokens";
type spaceType = keyof typeof wowSpace | number;
type colorType = keyof typeof wowColor;
type CSSFlexDirection = "row" | "row-reverse" | "column" | "column-reverse";

type CSSJustifyContent =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly"
  | "start"
  | "end";

type CSSAlignItems =
  | "stretch"
  | "flex-start"
  | "flex-end"
  | "center"
  | "baseline"
  | "start"
  | "end";
interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  direction?: CSSFlexDirection;
  justify?: CSSJustifyContent;
  align?: CSSAlignItems;
  margin?: spaceType;
  padding?: spaceType;
  gap?: spaceType;
  bgColor?: colorType;
  radius?: spaceType;
  width?: string | number;
  style?: CSSProperties;
}

const Flex = ({
  children,
  direction = "row",
  justify = "flex-start",
  align = "stretch",
  margin = 0,
  padding = 0,
  gap = 0,
  bgColor,
  radius = 0,
  width,
  style,
  ...props
}: FlexProps) => {
  return (
    <div
      style={{
        display: "flex",
        boxSizing: "border-box",
        flexDirection: direction,
        justifyContent: justify,
        alignItems: align,
        gap: typeof gap === "number" ? gap : wowSpace[gap],
        margin: typeof margin === "number" ? margin : wowSpace[margin],
        padding: typeof padding === "number" ? padding : wowSpace[padding],
        borderRadius: typeof radius === "number" ? radius : wowSpace[radius],
        width: width || "100%",
        backgroundColor:
          bgColor && typeof wowColor[bgColor] === "string"
            ? wowColor[bgColor]
            : "none",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default Flex;
