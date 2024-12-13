"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import AdminLogin from "../components/AdminLogin";
import AddMovie from "../components/AddMovie";

const Admin = ({}) => {
  const [isLogin, setIsLogin] = useState(false);
  const[isAddMovie,setIsAddMovie]=useState(false)
  const router = useRouter();
  const params = useSearchParams();
  const success = params.get("success");

  const adminLogin = () => {
    
    setIsLogin(true);
  };
  const adminLogout = () => {
    router.push("/");
  };
  const handleDataFromLogin = (data) => {
    if (data === false) {
      setIsLogin(data);
    }
  };

  const handleDataFromAddMovie=(data)=>{
    if (data === false) {
      setIsAddMovie(data);
    }
      
  }
  return (
    <div>
      {success === "true" ? (
        <h1
          onClick={adminLogout}
          className=" mx-auto cursor-pointer flex w-[20%] justify-center font-QSemi items-center text-[#417AB2] max-[715px]:text-[13px] border-[1px] border-[#417AB2]  p-[1%]"
        >
          Admin Logout
        </h1>
      ) : (
        <h1
          onClick={adminLogin}
          className=" mx-auto cursor-pointer flex w-[20%] justify-center font-QSemi items-center text-[#417AB2] max-[715px]:text-[13px] border-[1px] border-[#417AB2]  p-[1%]"
        >
          Admin Login
        </h1>
      )}
      {success ==="true"&&(
          <div className="flex justify-evenly mt-[100px]" >
          <h1 onClick={()=>setIsAddMovie(true)} className=" mx-auto cursor-pointer flex w-[20%] justify-center font-QSemi items-center text-[#CE567F] max-[715px]:text-[13px] border-[1px] border-[#CE567F]  p-[1%]" >
            Add Movies
          </h1>
          <h1 className=" mx-auto cursor-pointer flex w-[20%] justify-center font-QSemi items-center text-[#CE567F] max-[715px]:text-[13px] border-[1px] border-[#CE567F]  p-[1%]" >
            Add Shows
          </h1>
      </div>
      )}
      

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
                <AdminLogin onDataSend={handleDataFromLogin} />
              </motion.div>
            </div>
          </div>
        )}
        {isAddMovie && (
          <div className="overlay">
            <div className=" overlay-content fixed w-full flex h-screen justify-center items-center ">
              <motion.div
                className="w-[50%] max-[1000px]:w-[80%] max-[900px]:w-[90%] h-[500px] bg-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <AddMovie onDataSend={handleDataFromAddMovie} />
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Admin;
