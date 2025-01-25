import React from "react";
import ContentCard from "./card/ContentCard";

const Main = () => {
  const youtubelink = "https://www.youtube.com/watch?v=UmzFk68Bwdk&t=588s";
  const twitte = "https://x.com/shrutikapoor08/status/1883005653108859308";

  return (
    <div className=" w-full h-full p-4">
      <div className=" flex gap-5">
        <ContentCard title="Youtube Video" link={youtubelink} type="youtube" />
        <ContentCard title="Twitte" link={twitte} type="twitter" />
      </div>
    </div>
  );
};

export default Main;
