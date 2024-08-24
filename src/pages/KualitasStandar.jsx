import React, { useEffect, useState } from "react";
import axios from "axios";
import SidebarAdmin from "../components/Sidebar";

const KualitasStandar = () => {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchKualitasStandar = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7000/api/kualitas_standar",
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
            <tbody className="text-gray-600 text-base font-normal">
              {products.map((product, index) => (
                <tr key={product.id}>
                  <td className="py-3 px-6">{index + 1}</td>
                  <td className="py-3 px-6">{product.namaProduk}</td>
                  <td className="py-3 px-6">
                    {product.kategoriProduk.namaKategori}
                  </td>
                  <td className="py-3 px-6">
                    {product.detailProdukKualitasStandar.deskripsi}
                  </td>
                  <td className="py-3 px-6">
                    {product.detailProdukKualitasStandar.hargaProduk}
                  </td>
                  <td className="py-3 px-6">{product.status}</td>
                  <td className="py-3 px-6">
                    {/* Add any action buttons here */}
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">
                      Edit
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

export default KualitasStandar;
