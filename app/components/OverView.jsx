import React from "react";

const OverView = ({overView}) => {
  
    
  return (
    <div className="px-[7%] py-[30px] max-[425px]:py-[15px] max-[530px]:px-[3%] border-b-[1px] border-b-gray-200">
        <h1 className="font-QSemi mb-[10px] text-[20px] max-[425px]:text-[15px]" >Overview of movie</h1>
      <p className="font-QLight text-[15px] max-[425px]:text-[11px]" >
       {overView}
      </p>
    </div>
  );
};

export default OverView;
