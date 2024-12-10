"use client"
import { faArrowLeft, faArrowRight, faCancel, faCross, faLock, faPhone, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import loginImage from '../images/login.png'


const Login = ({onDataSend }) => {
    const[isLogin,setIsLogin]=useState(true)
    const[goToSignup,setGoToSignup]=useState(true)
    useEffect(() => {
        onDataSend(isLogin,goToSignup);
      }, [isLogin,goToSignup]);
  return (
    <div className='flex h-full relative' >
        <div className='w-[50%] flex justify-center items-center max-[620px]:hidden' >
            <img src={loginImage.src} alt="" />
        </div>
        <div className='w-[50%] max-[620px]:w-full pt-[70px] pb-[10px] flex  justify-center text-center  ' >
            <div className='w-full' >
            <h1 className='font-QBold text-[25px] mb-[60px]' >Login</h1>
            <div className='bg-gray-100 w-[70%] px-[3%] py-[2%] mx-auto flex justify-evenly items-center font-QRegular mb-[15px]' >
                <FontAwesomeIcon className='text-gray-500' icon={faPhone}/>
                <input className='outline-none bg-gray-100 text-gray-500' type="phone" placeholder='Phone' />
            </div>
            <div className='bg-gray-100 w-[70%] px-[3%] py-[2%] mx-auto flex justify-evenly items-center font-QRegular' >
                <FontAwesomeIcon className='text-gray-500' icon={faLock}/>
                <input className='outline-none bg-gray-100 text-gray-500' type="password" placeholder='Password' />
            </div>
            <h1  className=" cursor-pointer flex items-center font-QSemi text-[#417AB2] max-[715px]:text-[13px] border-[1px] justify-center mx-auto w-[50%] border-[#417AB2] mt-[30px]  px-[10%] py-[2%]" >Login</h1>
            <div onClick={()=>setGoToSignup(false)} className='flex justify-between mt-[100px] cursor-pointer text-[14px] w-[60%] items-center font-QMedium text-gray-500 mx-auto' >
                <h1>Create your account</h1>
                <FontAwesomeIcon icon={faArrowRight}/>
            </div>
            </div>
            
        </div>
        <div onClick={()=>setIsLogin(false)} className='absolute cursor-pointer top-[10px] right-[20px] text-[22px] text-gray-500' >
            <FontAwesomeIcon icon={faXmark}/>
        </div>
    </div>
  );
};

export default Login;