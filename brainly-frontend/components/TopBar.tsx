import { Button } from "./ui/Button";
import React, { useState } from "react";

interface TopProps {
  onClose: (a: boolean) => void;
}

const TopBar: React.FC<TopProps> = ({ onClose }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [errMessage, setErrMessage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleShare = async () => {
    const response = await fetch("http://localhost:3000/brain/share", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        share: true,
      }),
    });
    setIsOpen(true);
    if (response.ok) {
      const result = await response.json();
      console.log("result", result);
      
      setMessage(result.hash);
    } else {
      const result = await response.json();
      setErrMessage(result.message);
    }
  };

  return (
    <div className=" w-full h-16 flex justify-between items-center px-5 py-2 border-b border-neutral-600">
      <h1>Logo</h1>
      <div className=" flex gap-5">
        <Button title="share" size="md" type="primary" onClick={handleShare} />
        <Button
          title="add"
          size="md"
          type="secondary"
          onClick={() => onClose(true)}
        />
        {isOpen && <div className=" bg-white text-black fixed top-16 right-5 rounded-md min-w-60 p-2">
          <div className=" flex justify-between mb-2">
          <h1 className=" text-center shadow-xl px-1">share Link</h1>
          <h1 className=" text-center shadow-xl px-1 cursor-pointer" onClick={()=>setIsOpen(false)}>close</h1>
          </div>
          {
            message && <a href={`http://localhost:3000/brain/${message}`} target="_blank" className=" underline text-teal-600">http://localhost:3000/brain/{message}</a>
          }
          {
          errMessage && <span className=" underline text-teal-600">{errMessage}</span>
          }
        </div>}
      </div>
    </div>
  );
};

export default TopBar;
