import React from "react";
import p from "../images/push.jpg";

const MovieConfirmation = ({}) => {
  return (
    <div className="pt-[150px] max-[1000px]:pt-[120px] max-[650px]:pt-[90px] px-[7%] max-[530px]:px-[3%] flex justify-between max-[1250px]:flow-root max-[430px]:relative">
      <div className="w-[65%] max-[1250px]:w-full max-[1250px]:h-[310px] max-[630px]:h-[250px]" >
        <div className="flex  p-[2%]   max-[530px]:gap-x-[10px] max-[630px]:h-[250px] gap-x-[30px] shadow-lg ">
          <div className="w-[25%] h-[280px] max-[630px]:h-[225px] max-[430px]:h-[140px] ">
            <img className="w-full h-full object-cover" src={p.src} alt="" />
          </div>
          <div className=" w-[65%] max-[1250px]:w-[70%]  max-[430px]:h-[140px]">
            <div>
              <h1 className="text-[25px] max-[630px]:text-[20px] font-QSemi mt-[20px] max-[430px]:mt-[5px] mb-[5px]">
                Pushpa 2: The Rule
              </h1>
              <h2 className="text-gray-500 text-[15px] font-QRegular">
                Malayalam
              </h2>
              <h2 className="font-QMedium mt-[20px] max-[630px]:text-[13px] mb-[5px]">
                Pee Cee Talkies 4k Atmos, Mukkam
              </h2>
              <h2 className="text-[15px] font-QRegular text-gray-500 max-[1250px]:hidden">
                {" "}
                PEE CEE Road. Mukkam. Kerala 673602 India
              </h2>
            </div>
            <div className="flex justify-between mt-[40px] max-[430px]:hidden ">
              <div>
                <h1 className="text-[22px] max-[630px]:text-[17px] font-QSemi  mb-[5px]">
                  Thu, 05 Dec, 10:55 PM
                </h1>
                <h2 className="text-gray-500 max-[630px]:text-[13px] font-QRegular">
                  SCREEN 1 4K ATMOS, EXECUTIVE-N2
                </h2>
              </div>
              <div className="flex items-center max-[630px]:text-[14px] bg-slate-100 p-[2%]">
                <div>
                  <h1 className="text-center font-QSemi">1</h1>
                  <h2 className="font-QSemi text-gray-500">TICKET</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-[430px]:flex justify-between mt-[40px] hidden absolute w-[94%] top-[210px] px-[2%] ">
              <div>
                <h1 className="text-[22px] max-[630px]:text-[17px] font-QSemi  mb-[5px]">
                  Thu, 05 Dec, 10:55 PM
                </h1>
                <h2 className="text-gray-500 max-[630px]:text-[13px] font-QRegular">
                  SCREEN 1 4K ATMOS, EXECUTIVE-N2
                </h2>
              </div>
              <div className="flex items-center max-[630px]:text-[14px] bg-slate-100 p-[2%]">
                <div>
                  <h1 className="text-center font-QSemi">1</h1>
                  <h2 className="font-QSemi text-gray-500">TICKET</h2>
                </div>
              </div>
            </div>


      </div>

      <div className="w-[30%] max-[1250px]:w-full max-[1250px]:h-full max-[1250px]:my-[45px] shadow-lg  h-[293px]">
        <h1 className="font-QSemi text-[20px] mb-[25px] py-[2%] px-[5%] max-[630px]:text-[18px]">
          Booking Summary
        </h1>
        <div className="flex justify-between font-QMedium text-gray-600 py-[2%] px-[5%] max-[630px]:text-[15px]">
          <h1>1 Ticket</h1>
          <h1>₹ 110</h1>
        </div>
        <div className="flex justify-between font-QMedium text-gray-600 py-[2%] px-[5%] max-[630px]:text-[15px]">
          <h1>Taxes & Fees</h1>
          <h1>₹ 27.4</h1>
        </div>
        <div className="flex justify-between font-QSemi text-[20px] border-y-[1px] py-[2%] px-[5%] max-[630px]:text-[17px] border-y-gray-300">
          <h1>Total</h1>
          <h1>₹ 137.4</h1>
        </div>
        <button className="bg-[#417AB2] font-QSemi text-white w-[90%] py-[3%] px-[6%] m-[5%]">
          Proceed to pay ₹ 137.4{" "}
        </button>
      </div>
    </div>
  );
};

export default MovieConfirmation;
