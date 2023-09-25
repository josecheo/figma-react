import React from "react";
import { ButtonProps } from "./Button.type";

const getButtonClasses = (
  variant: string,
  size: string,
  disabled?: boolean
) => {

  let sizeClasses = "";
  if (size === "small") {
    sizeClasses = "min-w-[118px] h-[28px] px-[12px] py-[4px] text-base font-normal";
  } else if (size === "medium") {
    sizeClasses = "min-w-[160px] h-[40px] px-[28px] py-[8px] text-base font-normal";
  } else {
    sizeClasses = "min-w-[215px] h-[48px] px-[52px] py-[12px] text-lg font-normal";
  }

  if (variant === "primary") {
    return disabled
      ? `rounded-lg bg-disabled text-white ${sizeClasses}`
      : `rounded-lg bg-primary text-white hover:bg-secondary ${sizeClasses}`;
  } else if (variant === "secondary") {
    return disabled
      ? `rounded-lg bg-white text-disabled border border-disabled ${sizeClasses}`
      : `rounded-lg bg-white text-primary border border-primary hover:border-secondary hover:text-secondary ${sizeClasses}`;
  }
};

const Button = ({ label, onClick, size, variant, disabled }: ButtonProps) => {
  const buttonClasses = getButtonClasses(variant, size, disabled);
console.log("buttonClasses",buttonClasses)
  return (
    <button className={buttonClasses} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;
