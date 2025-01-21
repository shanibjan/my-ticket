"use client";
import React, { useEffect, useRef, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import QRCode from "react-qr-code";
import Script from "next/script";
import { toJpeg } from "html-to-image";
import download from "downloadjs";

const MovieConfirmation = ({ poster, seatQuantity, day }) => {
  const qrCodeRef = useRef(null); 
  const router = useRouter();
  const [text, setText] = useState("");
  const[isSave,setIsSave]=useState(false)
console.log(seatQuantity);

  const [pay, setPay] = useState();
  let payment = "";
  let groups = seatQuantity.reduce((acc, item) => {
    let prefix = item[0]; // Get the first character (e.g., 'A' or 'B')
    if (!acc[prefix]) acc[prefix] = [];
    acc[prefix].push(item);
    return acc;
  }, {});

  let result = Object.values(groups)
    .map((a) => a.sort())
    .map((group) => `${group[0]}-${group[group.length - 1]}`)
    .join(",");

  const searchParams = useSearchParams();
  const date = searchParams.get("date");
  const movie = searchParams.get("movie");
  const showTime = searchParams.get("showtime");
  const lang = searchParams.get("lang");
  const id = searchParams.get("id");
  const proceedPay = async () => {
    let total = seatQuantity.length * 110 + seatQuantity.length * 27.2;
    console.log(total);

    try {
      const { data: order } = await axios.post(
        "https://my-ticket-b9fg.vercel.app/api/payment/create-payment",
        {
          amount: Math.round(total * 100), // e.g., 50000 paise = ₹500
        }
      );

      const options = {
        key: "rzp_test_VYT3qiUFj68Unw",
        amount: order.amount,
        currency: order.currency,
        name: "My Ticket",
        description: "Test Transaction",
        order_id: order.id,
        handler: function (response) {
          payment = response;
          setTimeout(() => {
            seatConfirm();
          }, 1000);
        },
        prefill: {
          name: "jan",
          email: "jan",
          contact: "8382334",
        },
        notes: {
          address: "Customer Address",
        },
        theme: {
          color: "#94C4F7",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.log(error);
    }
  };

  const seatConfirm = async () => {
    try {
      if (payment) {
        const res = await axios.post(
          "https://my-ticket-b9fg.vercel.app/api/seat/add-seat",
          { seats: seatQuantity, movie: id, showTimematch: showTime, date }
        );
        console.log(res.data);
        setPay(payment);
        // router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const randomValue = Math.random().toString(36).substring(2, 15); // Random alphanumeric string
    setText(randomValue);
  }, []);
  const handleDownload = async () => {
    if (!qrCodeRef.current) return;
setIsSave(true)
    
    try {
      // Convert the QR code element to a PNG image
      const image = await toJpeg(qrCodeRef.current, { quality: 0.95 });
      setTimeout(()=>{
        download(image, "ticket.jpg");
      },1000)
      // Download the generated image
     
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };
  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />

      <div
        ref={qrCodeRef}
        className=" bg-white pt-[150px] max-[425px]:pt-[65px] max-[1000px]:pt-[120px] max-[650px]:pt-[90px] px-[7%] max-[530px]:px-[3%] flex justify-between max-[1250px]:flow-root max-[430px]:relative"
      >
        <div className="w-[65%] max-[1250px]:w-full max-[1250px]:h-[310px] max-[630px]:h-[250px] max-[425px]:h-[210px]">
          <div className="flex  p-[2%]   max-[530px]:gap-x-[10px] max-[630px]:h-[250px] max-[425px]:h-[210px] gap-x-[30px] shadow-lg ">
            <div className="w-[25%] h-[280px] max-[630px]:h-[225px] max-[430px]:h-[140px] ">
              <img
                className="w-full h-full object-cover rounded-md"
                src={poster}
                alt=""
              />
            </div>
            <div className=" w-[65%] max-[1250px]:w-[70%]  max-[430px]:h-[140px]">
              <div>
                <h1 className=" capitalize text-[25px] max-[630px]:text-[20px] max-[425px]:text-[15px] font-QSemi mt-[20px] max-[430px]:mt-[5px] mb-[5px]">
                  {movie}
                </h1>
                <h2 className=" capitalize text-gray-500 text-[15px] max-[425px]:text-[11px] font-QRegular">
                  {lang}
                </h2>
                <h2 className="font-QMedium mt-[20px] max-[630px]:text-[13px] max-[425px]:text-[11px] mb-[5px]">
                  ARC Abhilash Cinemas 4K, Mukkam
                </h2>
                <h2 className="text-[15px] font-QRegular text-gray-500 max-[1250px]:hidden">
                  {" "}
                  ARC Abhilash Cinemas 4K , Mukkam , Kerala , 673602 , India
                </h2>
              </div>
              <div className="flex justify-between mt-[40px] max-[430px]:hidden ">
                <div>
                  <h1 className="text-[22px] max-[630px]:text-[17px]  font-QSemi  mb-[5px]">
                    {day}, {date}, {showTime}
                  </h1>
                  <h2 className="text-gray-500 max-[630px]:text-[13px]  font-QRegular">
                    SCREEN 1 4K ATMOS, EXECUTIVE-
                    {seatQuantity.length === 1 ? seatQuantity[0] : result}
                  </h2>
                </div>
                <div className="flex items-center max-[630px]:text-[14px]  bg-slate-100 p-[2%]">
                  <div>
                    <h1 className="text-center font-QSemi">
                      {seatQuantity.length}
                    </h1>
                    <h2 className="font-QSemi text-gray-500">TICKET</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="max-[430px]:flex justify-between mt-[40px] max-[425px]:mt-[10px] hidden absolute w-[94%] top-[210px] px-[2%] ">
            <div>
              <h1 className="text-[22px] max-[630px]:text-[17px] max-[425px]:text-[14px] font-QSemi  mb-[5px]">
                {day}, {date}, {showTime}
              </h1>
              <h2 className="text-gray-500 max-[630px]:text-[13px] max-[425px]:text-[11px] font-QRegular">
                SCREEN 1 4K ATMOS, EXECUTIVE-
                {seatQuantity.length === 1 ? seatQuantity[0] : result}
              </h2>
            </div>
            <div className="flex items-center max-[630px]:text-[14px] bg-slate-100 p-[2%]">
              <div className="max-[425px]:text-[11px]">
                <h1 className="text-center font-QSemi">
                  {seatQuantity.length}
                </h1>
                <h2 className="font-QSemi text-gray-500">TICKET</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[30%] max-[1250px]:w-full max-[1250px]:h-full max-[1250px]:my-[10px] shadow-lg  h-[312px]">
          {pay ? (
            <div className="max-[425px]:h-[210px]" >
              <h1 className="text-[25px] max-[630px]:text-[20px] max-[425px]:text-[15px] font-QSemi text-center">
                Booking Confirmed
              </h1>
              <div className="flex h-[224px] max-[425px]:h-[130px] items-center justify-center">
                <QRCode className="h-[180px] max-[425px]:h-[80px]" value={text} size={256} />
              </div>
              <div className=" text-center">
                {isSave ? null : (
                  <button
                    onClick={handleDownload}
                    className="px-4 py-2 bg-[#417AB2] text-white font-QMedium  max-[425px]:text-[12px] rounded-md"
                  >
                    Save Ticket
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="h-[312px] max-[1250px]:h-full flex items-center">
              <div className="w-full">
                <h1 className="font-QSemi text-center text-[20px] mb-[25px] max-[425px]:mb-[5px] py-[2%] px-[5%] max-[630px]:text-[18px] max-[425px]:text-[15px]">
                  Booking Summary
                </h1>
                <div className="flex justify-between font-QRegular text-gray-600 py-[2%] px-[5%] max-[630px]:text-[15px] max-[425px]:text-[12px] ">
                  <h1>{seatQuantity.length} Ticket</h1>
                  <h1>₹ {seatQuantity.length * 110} </h1>
                </div>
                <div className="flex justify-between font-QRegular text-gray-600 py-[2%] px-[5%] max-[630px]:text-[15px] max-[425px]:text-[12px]">
                  <h1>Taxes & Fees</h1>
                  <h1>₹ {seatQuantity.length * 27.2}</h1>
                </div>
                <div className="flex justify-between font-QMedium text-[20px] border-y-[1px] py-[2%] px-[5%] max-[630px]:text-[17px] max-[425px]:text-[12px] border-y-gray-300">
                  <h1>Total</h1>
                  <h1>
                    ₹ {seatQuantity.length * 110 + seatQuantity.length * 27.2}
                  </h1>
                </div>
                <button
                  onClick={proceedPay}
                  className="bg-[#417AB2] max-[425px]:text-[12px] rounded-md font-QSemi text-white w-[90%] py-[3%] px-[6%] m-[5%]"
                >
                  Proceed to pay ₹{" "}
                  {seatQuantity.length * 110 + seatQuantity.length * 27.2}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MovieConfirmation;
