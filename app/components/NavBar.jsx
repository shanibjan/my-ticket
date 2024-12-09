import React from "react";
import logo from "../images/logo.png";

const NavBar = ({}) => {
 

  return (
    <div className="fixed w-full bg-white shadow-lg z-[100] h-[100px] max-[800px]:h-[80px] " >
      <div className="flex justify-between items-center mx-[7%]  max-[530px]:mx-[3%] max-[415px]:m-[3%] " >
        <div className="w-[8%] max-[1100px]:w-[10%] max-[530px]:w-[15%]" >
          <img className="w-full" src={logo.src} alt="" />
        </div>
        <div className="flex justify-between w-[20%] max-[1100px]:w-[30%] max-[715px]:w-[40%] max-[415px]:w-[50%] font-QSemi cursor-pointer  " >
          <h1 className=" flex items-center text-[#417AB2] max-[715px]:text-[13px] border-2 border-[#417AB2] rounded-[20px] px-[10%] py-[2%]" >Login</h1>
          <h1 className="flex items-center text-[#CE567F] max-[715px]:text-[13px] border-2 border-[#CE567F] rounded-[20px] px-[10%] py-[2%]" >Signup</h1>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
