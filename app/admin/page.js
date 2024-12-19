import React, { Suspense } from "react";
import AdminMain from "../components/AdminMain";
import axios from "axios";

const AdminMainPage =async ({}) => {
  let movies=[]
      try {
        const res=await axios.get('http://localhost:3000/api/movie/get-movie/get-id-get-name')
       
        movies=res.data
      } catch (error) {
        console.log(error);
        
      }
  return (
    <div>
      <Suspense>
        <AdminMain movies={movies} />
      </Suspense>
    </div>
  );
};

export default AdminMainPage;
