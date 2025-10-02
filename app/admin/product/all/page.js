import React, { Suspense } from "react";
import ProductPage from "./components/Product";

const page = () => {
  return (
    <div>
      <Suspense fallback={<>All Product Is Loading</>}>
        <ProductPage />
      </Suspense>
    </div>
  );
};

export default page;
