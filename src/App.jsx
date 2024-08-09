import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import TKDN from "./pages/Tkdn";
import NonTKDN from "./pages/Nontkdn";
import Pc from "./pages/Pc";
import Product from "./pages/Product";
import NotFound from "./pages/NotFound";
import DetailProduk from "./pages/DetailProduct";
import ListProduk from "./pages/ListProduct";
import CardProduk from "./pages/CardProduct";
import Login from "./components/Login";
import DashboardAdmin from "./components/Dashboard";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tkdn" element={<TKDN />} />
        <Route path="/nontkdn" element={<NonTKDN />} />
        <Route path="/pc" element={<Pc />} />
        <Route path="/product" element={<Product />} />
        <Route path="/detailproduct" element={<DetailProduk />} />
        <Route path="/listproduct" element={<ListProduk />} />
        <Route path="/cardproduct" element={<CardProduk />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashboardAdmin />} />
        <Route path="/navbar" element={<Sidebar />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
