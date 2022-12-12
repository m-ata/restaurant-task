import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { PageLoader } from "../components/Loader/Loader";

export const Layout = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <div className="layout">
        <header>
          <h1>Restaurant App</h1>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </Suspense>
  );
};
