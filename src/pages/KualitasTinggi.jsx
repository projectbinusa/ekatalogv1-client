import React, { useEffect, useState } from "react";
import SidebarAdmin from "../components/Sidebar";
import axios from "axios";

const KualitasTinggi = () => {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchKualitasStandar = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7000/api/kualitas_tinggi",
          {
            headers: {
              accept: "*/*",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchKualitasStandar();
  }, []);

  return (
    <div className="min-h-screen flex sm:flex-row">
      <div className="sidebar w-full md:w-64 bg-gray-100 shadow-lg">
        <SidebarAdmin />
      </div>
      <div className="flex-1 p-4">
        <div className="mt-20 overflow-x-auto border border-gray-200 rounded-lg shadow-lg">
          <table className="min-w-full bg-white divide-y-2 divide-gray-200 table-fixed rounded-xl">
            <thead>
              <tr className="bg-gray-200 text-gray-900 text-base leading-normal">
                <th className="py-3 px-6 text-left">No</th>
                <th className="py-3 px-6 text-left">Nama Produk</th>
                <th className="py-3 px-6 text-left">Kategori</th>
                <th className="py-3 px-6 text-left">Deskripsi Produk</th>
                <th className="py-3 px-6 text-left">Harga</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody
              style={{ backgroundColor: "white" }}
              className="text-gray-600 text-base font-normal"
            >
              {products.map((p, index) => (
                <tr
                  key={p.id}
                  className="border-b border-gray-300 hover:bg-gray-100"
                >
                  <td className="py-3 px-6">{index + 1}</td>
                  <td className="py-3 px-6">{p.namaProduk}</td>
                  <td className="py-3 px-6">{p.kategoriProduk.namaKategori}</td>
                  <td className="py-3 px-6">
                    {p.detailProdukKualitasTinggi.deskripsi}
                  </td>
                  <td className="py-3 px-6">
                    {p.detailProdukKualitasTinggi.hargaProduk}
                  </td>
                  <td className="py-3 px-6">{p.status}</td>
                  <td className="py-3 px-6">
                    <button className="bg-blue-500 text-white py-1 px-3 rounded mr-2">
                      Edit
                    </button>
                    <button className="bg-red-500 text-white py-1 px-3 rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default KualitasTinggi;
