// import { useRecoilValue } from "recoil";
import ContentCard from "./card/ContentCard";
import { useEffect, useState } from "react";
// import { itemAtom } from "../store/atom";
import { bg_url } from "../helper";

interface Tag {
  title: string
}
interface Item {
  _id: string;       
  title: string;    
  url: string;       
  type: "youtube" | "twitter";      
  tags: Array<Tag>;    

}

const Main = () => {
  // const item = useRecoilValue(itemAtom);
  // console.log(item);
  // const youtubelink = "https://www.youtube.com/watch?v=UmzFk68Bwdk&t=588s";
  // const twitte = "https://x.com/shrutikapoor08/status/1883005653108859308";
  // const tags = ["new", "car", "toy", "sex"];

  const [content, setContent] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${bg_url}/brain/content`, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const json = await response.json();
        setContent(json.allContent);
      }else{
        const json = await response.json();
        setError(json.message);
      }
    } catch (error) {
      console.error("Failed to fetch content:", error);
      setError("Failed to load content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className=" w-full h-full p-2 md:p-4 overflow-y-scroll overflow-x-hidden">
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-13 justify-center">
        {
          loading ? (<span>Loading...</span>): content.length > 0 ? (
            content.map((item)=> <ContentCard
            key={item._id}
            title={item.title}
            link={item.url}
            type={item.type}
            tags={item.tags}
          />)
          ) : error && (<span>{error}</span>)
        }
        {/* <ContentCard
          title="Youtube Video"
          link={youtubelink}
          type="youtube"
          tags={tags}
        /> */}
      </div>
    </div>
  );
};

export default Main;
