"use client";
import React, { useEffect, useState } from "react";
import logo from "../images/logo.png";
import { motion, AnimatePresence } from "framer-motion";
import Login from "./Login";
import Signup from "./SignUp";
import { useRouter } from "next/navigation";

const NavBar = ({}) => {
  const [isLogin, setIsLogin] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [user, setUser] = useState();
  const router=useRouter()

  const fetchUser = async () => {
    try {
      setUser(JSON.parse(localStorage.getItem("my-ticket-user")));
    } catch (error) {}
  };

  useEffect(() => {
    fetchUser();
  }, [isLogin || isSignup]);

  const handleDataFromLogin = (data, goToSignup) => {
    console.log(data);

    if (data === false) {
      setIsLogin(data);
    }
    if (goToSignup === false) {
      setIsLogin(goToSignup);
      setIsSignup(true);
    }
  };
  const handleDataFromSignup = (data, goToLogin) => {
    if (data === false) {
      setIsSignup(data);
    }
    if (goToLogin === false) {
      setIsLogin(true);
      setIsSignup(goToLogin);
    }
  };
  useEffect(() => {
    if (isLogin || isSignup) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isLogin, isSignup]);

  return (
    <div className="fixed w-full bg-white shadow-lg z-[100] h-[100px] max-[800px]:h-[80px] ">
      <div className="flex justify-between items-center mx-[7%]  max-[530px]:mx-[3%] max-[415px]:m-[3%] ">
        <div onClick={()=>router.push('/')} className="w-[8%] cursor-pointer max-[1100px]:w-[10%] max-[530px]:w-[15%]">
          <img className="w-full" src={logo.src} alt="" />
        </div>
        <div className="flex justify-between w-[20%] max-[1100px]:w-[30%] max-[715px]:w-[40%] max-[415px]:w-[50%] font-QSemi cursor-pointer  ">
          <h1
            onClick={() => {
              user ? null : setIsLogin(!isLogin);
            }}
            className=" flex items-center text-[#417AB2] max-[715px]:text-[13px] border-[1px] border-[#417AB2]  px-[10%] py-[2%]"
          >
            {user ? "Hi, " + user.name : "Login"}
          </h1>
          <h1
            onClick={() => {
              user
                ? localStorage.removeItem("my-ticket-user")
                : setIsSignup(!isSignup);
              fetchUser();
            }}
            className="flex items-center text-[#CE567F] max-[715px]:text-[13px] border-[1px] border-[#CE567F] px-[10%] py-[2%]"
          >
            {user ? "Logout" : "Signup"}
          </h1>
        </div>
      </div>
      <AnimatePresence>
        {isLogin ? (
          <div className="overlay">
            <div className=" overlay-content fixed w-full flex h-screen justify-center items-center ">
              <motion.div
                className="w-[50%] max-[1000px]:w-[80%] max-[900px]:w-[90%] h-[500px] bg-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Login onDataSend={handleDataFromLogin} />
              </motion.div>
            </div>
          </div>
        ) : isSignup ? (
          <div className="overlay">
            <div className=" overlay-content fixed w-full flex h-screen justify-center items-center ">
              <motion.div
                className="w-[50%] max-[1000px]:w-[80%] max-[700px]:w-[90%] h-[500px] bg-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Signup onDataSend={handleDataFromSignup} />
              </motion.div>
            </div>
          </div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default NavBar;
