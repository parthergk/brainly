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
    <div onClick={()=>setItem(name.toLowerCase())} className="w-full border-b border-neutral-600 py-2 sm:p-2 flex gap-5 justify-center md:justify-start items-center cursor-pointer hover:bg-neutral-700">
      <img src={imgUrl} alt="logo" className=" text-white w-6 sm:w-8" />
      <span className=" hidden md:block">{name}</span>
    </div>
  );
};

export default SideBarItem;
