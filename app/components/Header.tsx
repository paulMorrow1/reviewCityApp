import Navbar from "./Navbar";
import { SignInButton } from "./SignInButton";

const Header = () => {
  const user = "";
  return (
    <div className="w-full bg-cyan-600 border-b-2 border-black">
      <div className="py-4 px-2 flex justify-between">
        <div className=" bg-slate-500 border-2 border-slate-300 text-center rounded-full w-16 h-16 mt-1 sticky-top">
          <h1 className="text-blue-200 text-xl pt-4 pl-2.5 font-mono">
            ReviewCity
          </h1>
        </div>
        {/* <div className="flex mr-4">{!user ? <LoginButton /> : user}</div> */}
        <SignInButton />
      </div>
      <Navbar />
    </div>
  );
};

export default Header;
