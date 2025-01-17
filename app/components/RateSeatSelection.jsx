"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Login from "./Login";

const RateSeatSelection = ({ seats, onDataChange }) => {
  const [isClick, setIsClick] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState();
  const [a, setA] = useState(false);
 

  const fetchUser = async () => {
    try {
      setUser(JSON.parse(localStorage.getItem("my-ticket-user")));
    } catch (error) {}
  };

  useEffect(() => {
    fetchUser();
  }, [isLogin || isSignup]);

  const goTopayment = async () => {
    if (user) {
      setIsClick(true);
    } else {
      setIsLogin(true);
    }
  };

  useEffect(() => {
    if (a && user) {
      setIsClick(true);
    }
  }, [a, user]);

  const handleDataFromLogin = (data, goToSignup) => {
    if (data === false) {
      setIsLogin(data);
      setA(true);
    }
    if (goToSignup === false) {
      setIsLogin(goToSignup);
      setIsSignup(true);
    }
  };

  useEffect(() => {
    if (isLogin || isSignup) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isLogin, isSignup]);
  useEffect(() => {
    onDataChange(isClick);
  }, [isClick]);

  return (
    <div className="flex w-full bg-white fixed bottom-0 justify-between px-[8%] py-[1%] border-t-[1px] border-gray-300 font-QRegular">
      <div>
        <h1 className="font-QSemi">₹ {110 * seats.length}</h1>
        <h2 className="text-gray-500 text-[14px]">
          Tickets {seats.length} X 110
        </h2>
      </div>
      <button
        onClick={goTopayment}
        className="bg-[#CE567F] px-[5%] text-white "
      >
        Book Tickets
      </button>
      <AnimatePresence>
        {isLogin && (
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
        )}
      </AnimatePresence>
    </div>
  );
};

export default RateSeatSelection;
