import { Button } from "./ui/Button";

const TopBar = () => {
  return (
    <div className=" w-full h-16 flex justify-between items-center px-5 py-2 ">
      <h1>Logo</h1>
      <div className=" flex gap-5">
        <Button title="share" size="md" type="primary" onClick={()=>console.log("hello")
        } />
        <Button title="add" size="md" type="secondary" />
      </div>
    </div>
  );
};

export default TopBar;
