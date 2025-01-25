import { Button } from "./ui/Button";
import React from "react";

interface TopProps{
  onClose: (a:boolean)=>void
}

const TopBar:React.FC<TopProps> = ({onClose}) => {
  return (
    <div className=" w-full h-16 flex justify-between items-center px-5 py-2 border-b border-neutral-600">
      <h1>Logo</h1>
      <div className=" flex gap-5">
        <Button title="share" size="md" type="primary" onClick={()=>console.log("hello")
        } />
        <Button title="add" size="md" type="secondary" onClick={(()=>onClose(true))} />
      </div>
    </div>
  );
};

export default TopBar;
