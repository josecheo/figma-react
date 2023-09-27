import React from "react";
import { TypographyProps } from "./Typography.type";

const sizeVariants = {
  headline: "text-headline",
  subheadline: "text-subheadline",
  title: "text-title",
  heading: "text-heading",
  subheading: "text-subheading",
  body: "text-body",
  caption: "text-caption",
  small: "text-small",
  tiny: "text-tiny",
  micro: "text-micro",
};

const weightVariants = {
  extraLight: "font-extraLight",
  light: "font-light",
  regular: "font-regular",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

const textColor = {
  black: "text-black",
  white: "text-white",
  primary: "text-[#7B61FF]",
  secondary:"text-[#9747FF]",
}


const Typography = ({ size, weight, text, maxWidth, color }: TypographyProps) => {
  return (
    <div
      className={`${sizeVariants[size]} ${weightVariants[weight]} max-w-[${maxWidth}] ${textColor[color]} `}
    >
      {text}
    </div>
  );
};
export default Typography;
