import { ReactElement } from "react";

export interface ButtonProps {
  type: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  startIcon?: ReactElement
  text: string;
  onclick: () => void;
}

const veriantStyle = {
    "primary": "bg-purple-700 text-white",
    "secondary": "bg-purple-300 text-purple-600"
}

const sizeStyle = {
    "sm": "py-1 px-2",
    "md": "py-2 px-4",
    "lg": "py-3 px-6",
}

const customStyle =  'rounded-sm flex item-center justify-center gap-2'

export const Button = (props: ButtonProps) => {
    return <button  className={`${customStyle} ${veriantStyle[props.type]} ${sizeStyle[props.size]}`}> {props.startIcon} {props.text}</button>
}