import React from "react";
import './index.css';
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
import KualitasStandar from "./pages/tkdn/KualitasStandar";
import TambahTkdn from "./pages/tkdn/TambahTkdn";
import UploadImageTkdn from "./pages/tkdn/UploadImageTkdn";
import EditTkdn from "./pages/tkdn/EditTkdn";
import KualitasTinggi from "./pages/non_tkdn/KualitasTinggi";
import TambahNonTkdn from "./pages/non_tkdn/TambahNonTkdn";
import UploadImageNonTkdn from "./pages/non_tkdn/UploadImageNonTkdn";
import EditNonTkdn from "./pages/non_tkdn/EditNonTkdn";
import DetailPage from "./pages/non_tkdn/DetailProdukNonTkdn";
import DetailProdukTkdn from "./pages/tkdn/DetailProdukTkdn";
import ListByKeyboard from "./pages/listProduk/ListByKeyboard";
import ListByMonitor from "./pages/listProduk/ListByMonitor";
import ListByPc from "./pages/listProduk/ListByPc";
import ListByLaptop from "./pages/listProduk/ListByLaptop";

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
        <Route path="/kualitastinggi" element={<KualitasTinggi />} />
        <Route path="/kualitasstandar" element={<KualitasStandar />} />
        <Route path="/tambahtkdn" element={<TambahTkdn />} />
        <Route path="/tambahnontkdn" element={<TambahNonTkdn />} />
        <Route path="/updatetkdn/:id" element={<EditTkdn />} />
        <Route path="/updatenontkdn/:id" element={<EditNonTkdn />} />
        <Route path="/uploadimagetkdn/:id" element={<UploadImageTkdn />} />
        <Route path="/uploadimagenontkdn/:id" element={<UploadImageNonTkdn />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/detailtkdn/:id" element={<DetailProdukTkdn />} />
        <Route path="/listpc" element={<ListByPc />} />
        <Route path="/listlaptop" element={<ListByLaptop />} />
        <Route path="/listmonitor" element={<ListByMonitor />} />
        <Route path="/listkeyboard" element={<ListByKeyboard />} />
      </Routes>
    </div>
  );
}

export default App;
