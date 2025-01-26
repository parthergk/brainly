import React from "react";
import { TwitterTweetEmbed } from "react-twitter-embed";

interface CardProps {
  link: string;
  title: string;
  type: "youtube" | "twitter";
  tags: Array<string>;
}

const ContentCard: React.FC<CardProps> = ({ title, link, type, tags }) => {
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
    <div className=" w-[17rem] sm:w-72 min-h-80 ">
      <div className=" flex flex-col justify-center items-center bg-[#3f3f3f] p-2 rounded-sm shadow-xl space-y-2">
        <h1 className=" w-full text-center text-lg border-b border-neutral-300">
          {title}
        </h1>
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
          <div className="w-[15.7rem]">
            <TwitterTweetEmbed
              tweetId={tweetId}
              options={{ width: "500" }}
            ></TwitterTweetEmbed>
          </div>
        )}

        <div className=" w-full rounded-sm flex flex-wrap gap-2 py-1">
          {tags.map((tag) => (
            <span className=" bg-neutral-600 px-2 rounded-sm shadow">
              #{tag}
            </span>
          ))}
        </div>
        <div className="w-full h-auto overflow-hidden bg-neutral-600 shadow-lg rounded-xs px-2">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="block truncate"
          >
            {link}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
