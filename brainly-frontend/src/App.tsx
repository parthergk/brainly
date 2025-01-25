import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import Main from "../components/Main";

function App() {
  return (
    <div className=" h-screen w-screen bg-[#2c2c2c] text-white">
      <div className=" w-full h-full flex flex-col">
        <TopBar />
        <div className=" flex h-full">
          <SideBar />
          <Main />
        </div>
      </div>
    </div>
  );
}

export default App;
