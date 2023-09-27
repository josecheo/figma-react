import React from "react";
import { InputProps } from "./Input.type";

const Input = ({ placeholder }: InputProps) => {
  return <input className="w-[100%] rounded-xl bg-white border min-h-[45px] py-[5px] px-[15px]" placeholder={placeholder} />;
};
  
export default Input;
