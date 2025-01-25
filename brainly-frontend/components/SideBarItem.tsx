import React from "react";
import { useSetRecoilState } from "recoil"
import {itemAtom} from "../store/atom";

interface ItemProps {
  imgUrl: string;
  name: "Twitter" | "YouTube";
}

const SideBarItem: React.FC<ItemProps> = ({ imgUrl, name }) => {
  const setItem = useSetRecoilState(itemAtom);
  return (
    <div onClick={()=>setItem(name.toLowerCase())} className="w-full border-b border-neutral-600 p-2 flex gap-5 justify-start items-center cursor-pointer">
      <img src={imgUrl} alt="logo" className=" text-white w-8" />
      <span>{name}</span>
    </div>
  );
};

export default SideBarItem;
