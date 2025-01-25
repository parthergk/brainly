import React, { ReactElement } from "react";
interface ButtonProps {
  title: string;
  size: "sm" | "md" | "lg";
  type: "primary" | "secondary";
  onClick?: () => void;
  icon?: ReactElement;
}

const typeVariant = {
  primary: "bg-[#383838] text-white",
  secondary: "bg-[#0c8ce9] text-white",
};

const sizeVariant = {
  sm: "px-2",
  md: "px-4 py-1",
  lg: "px-6 py-2",
};

const customStyle = "flex item-center justify-bettwen cursor-pointer";

export const Button: React.FC<ButtonProps> = ({
  title,
  size,
  type,
  onClick,
  icon,
}) => {
  return (
    <button
      className={`${sizeVariant[size]} ${typeVariant[type]} ${customStyle}`}
      onClick={onClick}
    >{`${icon? icon: ""} ${title}`}</button>
  );
};