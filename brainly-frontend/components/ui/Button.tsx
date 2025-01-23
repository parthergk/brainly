import React from 'react';

export interface ButtonProps {
  type: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  startIcon?: string;
  text: string;
  onclick: () => void;
}

const veriant = {
    "primary": "bg-purpole-600 text-white",
    "secondary": "bg-purpole-300 text-purpole-300"
}

export const Button = (props: ButtonProps) => {
    return <button className={veriant[props.type]}>{props.text}</button>
}

<Button type="primary" size="md" text="hy" onclick={()=>{}}></Button>