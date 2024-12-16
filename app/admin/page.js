import React, { Suspense } from "react";
import AdminMain from "../components/AdminMain";

const AdminMainPage = ({}) => {
  return (
    <div>
      <Suspense>
        <AdminMain />
      </Suspense>
    </div>
  );
};

export default AdminMainPage;
