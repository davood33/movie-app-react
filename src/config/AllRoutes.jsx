import React from "react";
import {Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Detail from "../pages/Detail";
import Catalog from "../pages/Catalog";
const AllRoutes = () => {
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
