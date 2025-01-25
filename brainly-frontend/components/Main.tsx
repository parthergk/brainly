import ContentCard from "./card/ContentCard";
import React from "react";

const Main = () => {
  const youtubelink = "https://www.youtube.com/watch?v=UmzFk68Bwdk&t=588s";
  const twitte = "https://x.com/shrutikapoor08/status/1883005653108859308";
  const tags=["new", "car", "toy", "sex"]

  return (
    <div className=" w-full h-full p-4 overflow-y-scroll overflow-x-hidden">
      <div className=" flex gap-5">
        <ContentCard title="Youtube Video" link={youtubelink} type="youtube" tags={tags} />
        <ContentCard title="Twitte" link={twitte} type="twitter" tags={tags}/>
      </div>
    </div>
  );
};

export default Main;
