import React from "react";

const OverView = ({overView}) => {
  
    
  return (
    <div className="px-[7%] py-[30px] max-[530px]:px-[3%] border-b-[1px] border-b-gray-200">
        <h1 className="font-QSemi mb-[10px] text-[20px]" >Overview of movie</h1>
      <p className="font-QLight text-[15px]" >
       {overView}
      </p>
    </div>
  );
};

export default OverView;
