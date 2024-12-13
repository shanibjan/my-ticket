"use client";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";


const AdminLogin = ({ onDataSend }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const[success,setSucces]=useState(false)
  const[error,setError]=useState("")
 
 
  const router=useRouter()

  useEffect(() => {
    onDataSend(isLogin,success);
  }, [isLogin,success]);
  

  const adminLogin=async()=>{
    if(name==="1" && password==="1"){
      await setSucces(true)
      
      
      // router.push(`?success=${success}`)
     
    }else{
      setError("Invalid admin details");
      
    }
  }

  useEffect(() => {
    if (success) {
      router.push(`?success=${success}`);
      setIsLogin(false)
    }
  }, [success]);
  
  return (
    <div className="flex h-full relative items-center">
      <div className="w-full" >
      <h1 className="font-QBold text-[25px] mb-[30px] text-center">Admin Login</h1>
      {error && (
            <h1 className="mb-[10px] text-[15px] font-QRegular text-center text-red-600">
              {error}
            </h1>
          )}
      <div className="bg-gray-100 w-[70%] px-[3%] py-[2%] mx-auto flex justify-between items-center font-QRegular mb-[10px]">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="outline-none w-[90%] bg-gray-100 text-gray-500"
          type="text"
          placeholder="Username"
        />
      </div>
      <div className="bg-gray-100 w-[70%] px-[3%] py-[2%] mx-auto flex justify-between items-center font-QRegular">
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="outline-none w-[90%] bg-gray-100 text-gray-500"
          type="password"
          placeholder="Password"
        />
      </div>
      <h1
           onClick={adminLogin}
            className=" cursor-pointer flex items-center font-QSemi text-[#CE567F] max-[715px]:text-[13px] border-[1px] justify-center mx-auto w-[50%] border-[#CE567F] mt-[30px]  px-[10%] py-[2%]"
          >
            Login
          </h1>
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

export default AdminLogin;
