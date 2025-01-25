import React from "react";
import { TwitterTweetEmbed } from "react-twitter-embed";

interface CardProps {
  link: string;
  title: string;
  type: "youtube" | "twitter";
}
const ContentCard: React.FC<CardProps> = ({ title, link, type }) => {
  let embedId: string | null = "";
  let tweetId: string = "";

  function getId() {
    if (type === "twitter") {
      tweetId = link.replace("https://x.com/shrutikapoor08/status/", "");
    } else {
      const videoIdMatch = link.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
      embedId = videoIdMatch ? videoIdMatch[1] : null;
    }
  }
  getId();

  return (
    <div className="bg-[#3f3f3f] w-80 h-full min-h-96 p-2">
      <h1>{title}</h1>
      {type === "youtube" ? (
        <iframe
          width="560"
          height="200"
          src={`https://www.youtube.com/embed/${embedId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
          className=" max-w-full max-h-full"
        />
      ) : (
        <TwitterTweetEmbed
          tweetId={tweetId}
          options={{ width: "560" }}
        ></TwitterTweetEmbed>
      )}
    </div>
  );
};

export default ContentCard;
