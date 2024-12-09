import React from 'react';

const ShowTime = ({ }) => {
  return (
    <div className='px-[7%] max-[530px]:px-[3%] border-b-[1px] border-b-gray-200' >
     <div className='flex justify-between my-[50px] max-[620px]:my-[20px] max-[620px]:block items-center' >
        <div>
            <h1 className='font-QSemi mb-[50px] max-[425px]:font-QMedium max-[425px]:text-[14px]' >ARC Abhilash Cinemas 4K, Mukkam</h1>
        </div>
        <div className='grid grid-cols-6 w-[70%] gap-[25px] max-[800px]:gap-[10px] font-QSemi cursor-pointer max-[1170px]:grid-cols-5 max-[870px]:w-[90%] max-[620px]:w-full max-[870px]:grid-cols-4 max-[800px]:grid-cols-3' >
            <span className=' text-center border-[1px] text-[#21C179] border-gray-200 py-[10%] px-[1%]' >
                <h1>2:45 PM</h1>
            </span>
            <span className=' text-center border-[1px] text-[#21C179] border-gray-200 py-[10%] px-[1%]' >
                <h1>5:45 PM</h1>
            </span>
            <span className=' text-center border-[1px] text-[#FF9D00] border-gray-200 py-[10%] px-[1%]' >
                <h1>9:15 PM</h1>
            </span>
            <span className=' text-center border-[1px] text-[#21C179] border-gray-200 py-[10%] px-[1%]' >
                <h1>2:45 PM</h1>
            </span>
            <span className=' text-center border-[1px] text-[#21C179] border-gray-200 py-[10%] px-[1%]' >
                <h1>5:45 PM</h1>
            </span>
            <span className=' text-center border-[1px] text-[#FF9D00] border-gray-200 py-[10%] px-[1%]' >
                <h1>9:15 PM</h1>
            </span>
            <span className=' text-center border-[1px] text-[#FF9D00] border-gray-200 py-[10%] px-[1%]' >
                <h1>9:15 PM</h1>
            </span>
        </div>
     </div>
    </div>
  );
};

export default ShowTime;