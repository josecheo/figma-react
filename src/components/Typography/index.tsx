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
}  

const weightVariants = {
  extraLight: "font-extraLight",
  light: "font-light",
  regular: "font-regular",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
} 

const Typography = ({ size, weight, text }: TypographyProps) => {

  return (
    <div className={`${sizeVariants[size]} ${weightVariants[weight]}`}>{text}</div>
  );
};
export default Typography;
