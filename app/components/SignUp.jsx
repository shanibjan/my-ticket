"use client";
import {
  faUser,
  faArrowRight,
  faLock,
  faPhone,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import signupImage from "../images/ticket.png";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const Signup = ({ onDataSend }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [goToLogin, setGoToLogin] = useState(true);
  const [phone, setPhone] = useState("+91");
  const [valid, setValid] = useState(true);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    // Ensure the value always starts with +91
    if (e.target.value.startsWith("+91")) {
      setPhone(e.target.value);
    }
    setValid(true);

    if (phone && phone.length === 12) {
      setValid(false);
    }
    if (phone && phone.length === 14) {
      setValid(false);
    }
  };
  useEffect(() => {
    onDataSend(isLogin, goToLogin);
  }, [isLogin, goToLogin]);
  const Signup = async () => {
    try {
      const res = await axios.post(`http://localhost:3000/api/auth/register`, {
        name,
        password,
        phone,
      });

      if (res.data.success) {
        localStorage.setItem("my-ticket-user", JSON.stringify(res.data.user));
        setIsLogin(false);
      }
    } catch (error) {
      console.log(error.response.data.message);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="flex h-full relative">
      <div className="w-[50%] flex justify-center items-center max-[620px]:hidden">
        <img className="w-[75%]" src={signupImage.src} alt="" />
      </div>
      <div className="w-[50%] max-[620px]:w-full pt-[50px] pb-[10px] flex  justify-center text-center  ">
        <div className="w-full">
          <h1 className="font-QBold text-[25px] mb-[30px]">Signup</h1>
          {error && (
            <h1 className="mb-[10px] text-[15px] font-QRegular text-red-600">
              {error}
            </h1>
          )}
          <div className="bg-gray-100  w-[70%] px-[3%] py-[2%] mx-auto flex justify-between items-center font-QRegular mb-[10px]">
            <FontAwesomeIcon className="text-gray-500" icon={faPhone} />
            <input
              value={phone}
              onChange={handleInputChange}
              className="outline-none w-[90%] bg-gray-100 text-gray-500"
              type="phone"
              placeholder="Phone"
            />
          </div>
          <AnimatePresence>
            {valid && (
              <motion.div
                key="error-message" // Add a unique key for AnimatePresence
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                exit={{ y: -10 }}
                transition={{ duration: 0.2 }}
                className="text-red-500 mb-[10px] text-[12px] font-QRegular max-[560px]:text-[10px]"
              >
                Enter a valid phone number
              </motion.div>
            )}
          </AnimatePresence>
          <div className="bg-gray-100 w-[70%] px-[3%] py-[2%] mx-auto flex justify-between items-center font-QRegular mb-[10px]">
            <FontAwesomeIcon className="text-gray-500" icon={faUser} />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="outline-none w-[90%] bg-gray-100 text-gray-500"
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="bg-gray-100 w-[70%] px-[3%] py-[2%] mx-auto flex justify-between items-center font-QRegular">
            <FontAwesomeIcon className="text-gray-500" icon={faLock} />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="outline-none w-[90%] bg-gray-100 text-gray-500"
              type="password"
              placeholder="Password"
            />
          </div>
          <h1
            onClick={Signup}
            className=" cursor-pointer flex items-center font-QSemi text-[#CE567F] max-[715px]:text-[13px] border-[1px] justify-center mx-auto w-[50%] border-[#CE567F] mt-[30px]  px-[10%] py-[2%]"
          >
            Signup
          </h1>
          <div
            onClick={() => setGoToLogin(false)}
            className="flex justify-between mt-[60px] cursor-pointer text-[14px] w-[60%] items-center font-QMedium text-gray-500 mx-auto"
          >
            <h1>Login to your account</h1>
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
        </div>
      </div>
      <div
        onClick={() => setIsLogin(false)}
        className="absolute cursor-pointer top-[10px] right-[20px] text-[22px] text-gray-500"
      >
        <FontAwesomeIcon icon={faXmark} />
      </div>
    </div>
  );
};

export default Signup;
