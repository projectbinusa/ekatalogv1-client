import React, { useEffect, useState } from "react";
import SidebarAdmin from "../components/Sidebar";
import axios from "axios";
import {
  faAngleLeft,
  faAngleRight,
  faEdit,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fontsource/poppins";
import { Link } from "react-router-dom";

const KualitasTinggi = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const token = localStorage.getItem("token");
  const pageSize = 5;

  useEffect(() => {
    const fetchKualitasStandar = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7000/api/kualitas_tinggi/pagination?page=${currentPage}&size=${pageSize}`,
          {
            headers: {
              accept: "*/*",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProducts(response.data.data.content);
        setTotalPages(response.data.pagination.totalPages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchKualitasStandar();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="min-h-screen flex sm:flex-row">
      <div className="sidebar w-full md:w-64 bg-gray-100 shadow-lg">
        <SidebarAdmin />
      </div>
      <div className="flex-1 p-4">
        <div
          style={{ backgroundColor: "white" }}
          className="my-10 bg-white border border-gray-200 md:mt-20 mt-10 rounded-xl shadow-lg p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-semibold text-gray-800">
              Data Non TKDN
            </h1>
            <Link to="/tambahnontkdn">
              <button className="bg-green-500 text-white p-2 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon={faPlus} className="text-xl" />
              </button>
            </Link>
          </div>

          <div className="mt-9 overflow-x-auto border border-gray-200 rounded-lg shadow-lg">
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
                    <td className="py-3 px-6">
                      {index + 1 + currentPage * pageSize}
                    </td>
                    <td className="py-3 px-6">{p.namaProduk}</td>
                    <td className="py-3 px-6">
                      {p.kategoriProduk.namaKategori}
                    </td>
                    <td className="py-3 px-6">
                      {p.detailProdukKualitasTinggi.deskripsi}
                    </td>
                    <td className="py-3 px-6">
                      {p.detailProdukKualitasTinggi.hargaProduk}
                    </td>
                    <td className="py-3 px-6">{p.status}</td>
                    <td className="py-3 px-6 flex space-x-2">
                      <button className="bg-blue-500 text-white p-2 rounded-lg flex items-center justify-center">
                        <FontAwesomeIcon icon={faEdit} className="text-xl" />
                      </button>
                      <button className="bg-red-500 text-white p-2 rounded-lg flex items-center justify-center">
                        <FontAwesomeIcon icon={faTrash} className="text-xl" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-center items-center mt-4">
              <button
                className="bg-gray-300 text-gray-600 px-4 py-2 rounded"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
              >
                <FontAwesomeIcon icon={faAngleLeft} />
              </button>
              <span>
                Page {currentPage + 1} of {totalPages}
              </span>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage + 1 >= totalPages}
              >
                <FontAwesomeIcon icon={faAngleRight} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KualitasTinggi;
