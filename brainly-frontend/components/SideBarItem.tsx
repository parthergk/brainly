import React from "react";
interface ItemProps {
  imgUrl: string;
  name: "Twitter" | "YouTube";
}

const SideBarItem: React.FC<ItemProps> = ({ imgUrl, name }) => {
  return (
    <div className="w-full border-b border-neutral-600 p-2 flex gap-5 justify-start items-center">
      <img src={imgUrl} alt="logo" className=" text-white w-8" />
      <span>{name}</span>
    </div>
  );
};

export default SideBarItem;
