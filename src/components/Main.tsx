import Display from "./Display";
import SideBar from "./SideBar";
const Main = () => {
  return (
    <div className="md:h-full h-[100%] w-full">
      <div className="flex md:flex-row max-md:h-full w-full flex-col-reverse gap-4 justify-start">
        <SideBar />
        <Display />
      </div>
    </div>
  );
};

export default Main;
