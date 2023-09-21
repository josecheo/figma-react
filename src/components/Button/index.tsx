import React from "react";
import { ButtonProps } from "./Button.types";

const getButtonClasses = (variant, disabled) => {
  const baseClasses =
    "min-w-btn-min-w px-52px py-3 rounded-lg text-lg font-normal max-h-12";
  if (variant === "primary") {
    return disabled
      ? `${baseClasses} bg-disabled text-white`
      : `${baseClasses} bg-primary text-white hover:bg-secondary`;
  } else if (variant === "secondary") {
    return disabled
      ? `${baseClasses} bg-white text-disabled border border-disabled`
      : `${baseClasses} bg-white text-primary border border-primary hover:border-secondary hover:text-secondary`;
  }
  return baseClasses;
};

const Button = ({ label, onClick, size, variant, disabled }: ButtonProps) => {
  const buttonClasses = getButtonClasses(variant, disabled);

  return (
    <button className={buttonClasses} onClick={() => {}} disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;
