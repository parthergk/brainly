import { useRecoilValue } from "recoil";
import ContentCard from "./card/ContentCard";
import React from "react";
import { itemAtom } from "../store/atom";

const Main = () => {
  const item = useRecoilValue(itemAtom);
  console.log(item);
  
  const youtubelink = "https://www.youtube.com/watch?v=UmzFk68Bwdk&t=588s";
  const twitte = "https://x.com/shrutikapoor08/status/1883005653108859308";
  const tags=["new", "car", "toy", "sex"]

  return (
    <div className=" w-full h-full p-2 md:p-4 overflow-y-scroll overflow-x-hidden">
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-13 justify-center">
        <ContentCard title="Youtube Video" link={youtubelink} type="youtube" tags={tags} />
        <ContentCard title="Twitte" link={twitte} type="twitter" tags={tags}/>
        <ContentCard title="Twitte" link={twitte} type="twitter" tags={tags}/>
        <ContentCard title="Twitte" link={twitte} type="twitter" tags={tags}/>
      </div>
    </div>
  );
};

export default Main;
