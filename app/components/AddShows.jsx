import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import imageCompression from "browser-image-compression";
import axios from "axios";

const AddShows = ({ onDataSend, movies }) => {
  const [dates, setDates] = useState([]);
  const [toDate, setToDate] = useState("");
  const [toMovie, setToMovie] = useState("");
  const [time, setTime] = useState("");
  const [successMessage,setSuccessMessage]=useState("")
  const [isLogin, setIsLogin] = useState(true);
  const [formattedTime, setFormattedTime] = useState("");
  

  const [error, setError] = useState("");

  const handleTimeChange = (e) => {
    const rawTime = e.target.value; // Get the selected time in HH:mm format
    setTime(rawTime); // Store the raw time

    // Convert to 12-hour format with AM/PM
    const [hours, minutes] = rawTime.split(":");
    const period = +hours >= 12 ? "PM" : "AM";
    const formattedHours = +hours % 12 || 12; // Convert 0 to 12 for midnight
    setFormattedTime(`${formattedHours}:${minutes} ${period}`); // Update formatted time
  };
  useEffect(() => {
    onDataSend(isLogin);
  }, [isLogin]);

  const generateNext7Dates = () => {
    const dates = [];
    const currentDate = new Date();

    for (let i = 0; i < 7; i++) {
      const futureDate = new Date(currentDate); // Clone the current date

      futureDate.setDate(currentDate.getDate() + i); // Add i days to the current date

      const formattedDate = futureDate
        .toLocaleDateString("en-US", {
          month: "short", // Short month name (e.g., DEC)
          day: "2-digit", // Two-digit day (e.g., 18)
        })
        .toUpperCase()
        .replace(" ", "-");

      dates.push(formattedDate);
      setDates(dates);
    }

    return dates;
  };
  useEffect(() => {
    generateNext7Dates();
  }, []);

  const addShow=async()=>{
    try {
        const res= await axios.post('http://localhost:3000/api/show/add-show',{date:toDate,showsTime:formattedTime,movie:toMovie})
        console.log(res.data);
        if(res.data.success){
            setError("")
            setSuccessMessage(toDate + formattedTime + res.data.message)
            
            
        }
        
    } catch (error) {
        setSuccessMessage("")
        console.log(error);
        setError(error.response.data.message)
        
    }
  }
  return (
    <div className="flex h-full overflow-auto hide-scrollbar relative items-center box-border">
      <div className="w-full h-full pt-[30px] pb-[30px]">
        <h1 className="font-QBold text-[25px] mb-[30px] text-center">
          Add Show
        </h1>

        <div className="bg-gray-100 w-[70%] px-[3%] py-[2%] mx-auto flex justify-between items-center font-QRegular mb-[10px]">
          <select
            className="w-full bg-gray-100 outline-none capitalize"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          >
            <option value="">Select date</option>
            {dates.map((d, i) => {
              return (
                <option className="bg-gray-100" key={i} value={d}>
                  {d}
                </option>
              );
            })}
          </select>
        </div>
        <div className="bg-gray-100 w-[70%] px-[3%] py-[2%] mx-auto flex justify-between items-center font-QRegular mb-[10px]">
          <label htmlFor="time" style={{ marginRight: "10px" }}>
            Select Time:
          </label>
          <input
            type="time"
            id="time"
            value={time} // Bind the state value to the input
            onChange={handleTimeChange} // Update the state on input change
            style={{ padding: "5px", fontSize: "16px" }}
          />
        </div>
        <div className="bg-gray-100 w-[70%] px-[3%] py-[2%] mx-auto flex justify-between items-center font-QRegular mb-[10px]">
          <select
            className="w-full bg-gray-100 outline-none capitalize"
            value={toMovie}
            onChange={(e) => setToMovie(e.target.value)}
          >
            <option value="">Select Movie</option>
            {movies.map((d, i) => {
              return (
                <option className="bg-gray-100 " key={i} value={d._id}>
                  {d.movieName}
                </option>
              );
            })}
          </select>
        </div>

       
        {successMessage ? (
          <h1 className="mb-[10px] text-[15px] font-QRegular text-center text-green-500">
            {successMessage}
          </h1>
        ):error ? (
            <h1 className="mb-[10px] text-[15px] font-QRegular text-center text-red-600">
              {error}
            </h1>
          ):null}
        
          <h1 onClick={addShow} className="mx-auto cursor-pointer text-center flex items-center font-QSemi text-[#CE567F] max-[715px]:text-[13px] border-[1px] justify-center  w-[30%] max-[425px]:w-[45%] border-[#CE567F] mt-[30px] p-[2%]">
            Add Show
          </h1>
        

        <div className="h-[30px]"></div>
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

export default AddShows;
