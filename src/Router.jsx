import React, { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { appRoutes } from "./utils/constants";

const PropertyListing = lazy(() => import("./pages/ReservationsList/ReservationsList"));

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={appRoutes.home} element={<Layout />}>
          <Route index element={<PropertyListing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
