import React, { Suspense } from "react";
import OrderTable from "./components/OrderTable";

const page = () => {
  return (
    <div>
      <Suspense fallback={<>All Order Loading....</>}>
        <OrderTable />
      </Suspense>
    </div>
  );
};

export default page;
