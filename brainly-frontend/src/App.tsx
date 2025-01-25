import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import Main from "../components/Main";
import AddContent from "../components/card/AddContent";
import { useState } from "react";
import { RecoilRoot } from "recoil";

function App() {
  const [onClose, setOnClose] = useState<boolean>(false);
  return (
    <RecoilRoot>
      <div className=" h-screen w-screen bg-[#2c2c2c] text-white overflow-hidden">
        {onClose && <AddContent onClose={setOnClose} />}
        <div className=" w-full h-full flex flex-col">
          <TopBar onClose={setOnClose} />
          <div className=" flex h-full">
            <SideBar />
            <Main />
          </div>
        </div>
      </div>
    </RecoilRoot>
  );
}

export default App;
