import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { PageLoader } from "../components/Loader/Loader";

export const Layout = () => {
  return (
    // Suspense added for lazy loading support
    <Suspense fallback={<PageLoader />}>
      <div className="layout">
        <header>
          <h1>Reservations App</h1>
        </header>
        <main>
          {/* Route component will be rendered here */}
          <Outlet />
        </main>
      </div>
    </Suspense>
  );
};
