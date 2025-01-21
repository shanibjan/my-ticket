"use client";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useState } from "react";

const ShowTime = ({ showDetailDate, showDetail, language }) => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const id = searchParams.get("id");
  const date = searchParams.get("date");

  showDetailDate.length &&
    showDetailDate.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA - dateB; // Sort in ascending order
    });

  const [categoryClick, setCategoryClick] = useState(
    date ? date : showDetailDate.length > 0 ? showDetailDate[0].date : ""
  );

  // let filteredShowDetail =
  //   showDetail.length > 0
  //     ? showDetail.reduce((acc, curr) => {
  //         if (curr.date === categoryClick) {
  //           acc.push(curr.showsTime);
  //         }
  //         return acc;
  //       }, [])
  //     : null;

  const convertTo24Hour = (time) => {
    const [hours, minutes] = time.split(/[: ]/);
    const period = time.includes("AM") ? "AM" : "PM";
    let hour = parseInt(hours, 10);

    if (period === "PM" && hour !== 12) {
      hour += 12;
    } else if (period === "AM" && hour === 12) {
      hour = 0;
    }

    return `${hour.toString().padStart(2, "0")}:${minutes}`;
  };
  // if (filteredShowDetail) {
  //   filteredShowDetail.sort((a, b) => {
  //     const timeA = convertTo24Hour(a);
  //     const timeB = convertTo24Hour(b);

  //     return timeA.localeCompare(timeB);
  //   });
  // }

  showDetail.sort((a, b) => {
    const timeA = convertTo24Hour(a.showsTime);
    const timeB = convertTo24Hour(b.showsTime);

    return timeA.localeCompare(timeB);
  });

  const dateClick = (date) => {
    setCategoryClick(date);
    const newParams = new URLSearchParams(searchParams);

    newParams.set("name", name || "");
    newParams.set("id", id || "");
    newParams.set("date", date);

    // Update the URL without triggering a page reload
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${newParams.toString()}`
    );
  };

  const selectShow = (showTime) => {
    router.push(
      `/seats?movie=${name}&id=${id}&date=${
        date ? date : showDetailDate.length > 0 ? showDetailDate[0].date : ""
      }&showtime=${showTime}&lang=${language}`
    );
  };
  return (
    <div className="px-[7%] max-[530px]:px-[3%] border-b-[1px] border-b-gray-200">
      <div className="flex gap-x-[20px] mt-[50px] max-[620px]:mt-[20px]">
        {showDetailDate.length > 0 ? (
          showDetailDate.map((date, i) => {
            return (
              <button
                onClick={() => dateClick(date.date)}
                key={i}
                className={` text-center max-[425px]:px-[5%] max-[425px]:py-[2%] rounded-md  font-QMedium border-[1px] cursor-pointer border-[#417AB2] p-[1%] text-[15px] max-[1140px]:text-[10px] ${
                  categoryClick === date.date ? "bg-[#417AB2] text-white" : ""
                }`}
              >
                {date.date}
              </button>
            );
          })
        ) : (
          <h1>NO SHOWS</h1>
        )}
      </div>

      <div className="flex justify-between my-[50px] max-[620px]:my-[20px] max-[620px]:block items-center">
        <div>
          <h1 className="font-QSemi max-[425px]:font-QMedium max-[425px]:text-[13px] max-[425px]:my-[15px]">
            ARC Abhilash Cinemas 4K, Mukkam
          </h1>
        </div>
        <div className="grid grid-cols-6 w-[70%] gap-[25px] max-[800px]:gap-[10px] font-QSemi cursor-pointer max-[1170px]:grid-cols-5 max-[870px]:w-[90%] max-[620px]:w-full max-[870px]:grid-cols-4 max-[800px]:grid-cols-3">
          {/* {filteredShowDetail &&
            filteredShowDetail.map((show, i) => {
              return (
                <span
                  onClick={() => selectShow(show)}
                  key={i}
                  className=" text-center border-[1px] text-[#21C179] border-gray-200 py-[10%] px-[1%]"
                >
                  <h1>{show}</h1>
                </span>
              );
            })} */}
          {showDetail.map((show, i) =>
            show.date === categoryClick ? (
              show.seats.length === 32 ? (
                <span
                  key={i}
                  className={`text-center border-[1px] text-gray-400 border-gray-200 py-[10%] px-[1%] rounded-md  `}
                >
                  <h1>{show.showsTime}</h1>
                </span>
              ) : (
                <span
                  onClick={() => selectShow(show.showsTime)}
                  key={i}
                  className={`text-center border-[1px] text-[#21C179] border-gray-200 py-[10%] rounded-md px-[1%] ${
                    show.seats.length > 16 && show.seats.length < 24
                      ? "text-[#FF9D00]"
                      : show.seats.length > 24 && show.seats.length < 32
                      ? "text-[#F44337]"
                      : ""
                  } `}
                >
                  <h1>{show.showsTime}</h1>
                </span>
              )
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowTime;
