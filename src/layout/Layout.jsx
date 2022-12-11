import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { PageLoader } from "../components/Loader/Loader";

export const Layout = () => {
  return (
    <>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </>
  );
};
