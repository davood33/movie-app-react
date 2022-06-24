import React, { useEffect } from "react";
import {Route, Routes, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import Detail from "../pages/Detail/Detail";
import Catalog from "../pages/Catalog";
const AllRoutes = () => {
  function useScrollToTop() {
    const { pathname } = useLocation();
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  }
  useScrollToTop()
  return (
      <Routes>
        <Route path="/:category/search/:keyword" element={<Catalog />}></Route>
        <Route path="/:category/:id" element={<Detail />}></Route>
        <Route path="/:category" element={<Catalog />}></Route>
        <Route path="/" element={<Home />}></Route>
      </Routes>
  );
};

export default AllRoutes;
