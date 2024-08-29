import React from "react";
import SidebarAdmin from "../components/Sidebar";
import "@fontsource/poppins";

const ListProduk = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="sidebar w-full md:w-64">
        <SidebarAdmin />
      </div>
      <h1 className=" text-center text-3xl mt-20 mb-8block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">
        Silahkan Pilih Produk
      </h1>
      <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        Contoh Produk
      </div>
    </div>
  );
};

export default ListProduk;
