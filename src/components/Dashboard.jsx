import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SidebarAdmin from "./Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const DashboardAdmin = () => {
  const [username, setUsername] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    } else {
      axios
      .get("http://localhost:7000/api/pengguna", {
        headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUsername(response.data.usernamePengguna);
        })
        .catch((error) => {
          console.error("Token tidak valid: ", error);
          localStorage.removeItem("token");
          navigate("/login");
        });
    }
  }, [navigate]);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []); 

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      Promise.all([
        axios.get("http://localhost:7000/api/kualitas_standar", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:7000/api/kualitas_tinggi", {
          headers: { Authorization: `Bearer ${token}` },
        })
      ])
      .then((responses) => {
        const [kualitasStandarResponse, kualitasTinggiResponse] = responses;
        const kualitasStandarData = kualitasStandarResponse.data.data.slice(0, 10);
        const kualitasTinggiData = kualitasTinggiResponse.data.data.slice(0, 10);
        const combinedProducts = [
          ...kualitasStandarData,
          ...kualitasTinggiData
        ];
        setProducts(combinedProducts);
      })
      .catch((error) => {
        console.error("Gagal mengambil data produk: ", error);
      });
    }
  }, []);

  return (
    <div className="min-h-screen flex sm:flex-row bg-gray-50">
      <SidebarAdmin />
      <section className="text-gray-800 body-font flex-1 mt-20 px-4 relative">
        {/* {username && (
          <div className="py-4 px-6">
            <h1
              className="text-gray-800 text-center relative text-lg p-3 bg-gray-100"
              style={{
                boxShadow: "2px 2px 4px rgba(0,0,0,0,.4)",
                borderRadius: "10px",
              }}
            >
              Hai, <strong>{username}</strong>!{" "}
              <span style={{ boxShadow: "none" }}>
                Selamat datang di dashboard Admin.
              </span>
            </h1>
          </div>
        )} */}

        {/* Penempatan tombol dalam grid */}
        <div className="mb-12 flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4 z-10">
          <div className="flex flex-col space-y-4">
            <Link to={`/tambahkategori`}>
              <button
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-lg shadow-xl transition duration-300 transform hover:scale-105 flex items-center justify-center w-full max-w-xs"
              >
                <FontAwesomeIcon icon={faPlus} className="w-6 h-6 mr-3" />
                Tambah Kategori
              </button>
            </Link>
          </div>
          <div className="flex flex-col space-y-4">
            <Link to={`/tambahdetailekslusif`}>
              <button
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-6 rounded-lg shadow-xl transition duration-300 transform hover:scale-105 flex items-center justify-center w-full max-w-xs"
              >
                <FontAwesomeIcon icon={faPlus} className="w-6 h-6 mr-3" />
                Detail Produk Eksklusif
              </button>
            </Link>
            <Link to={`/tambahdetailreguler`}>
              <button
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold py-4 px-6 rounded-lg shadow-xl transition duration-300 transform hover:scale-105 flex items-center justify-center w-full max-w-xs"
              >
                <FontAwesomeIcon icon={faPlus} className="w-6 h-6 mr-3" />
                Detail Produk Reguler
              </button>
            </Link>
          </div>
        </div>

        {/* Tabel Produk */}
        <div className="flex justify-center">
        <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-lg w-full max-w-5xl">
          <table className="min-w-full bg-white divide-y-2 divide-gray-200 table-fixed rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-900 text-sm sm:text-base leading-normal">
                <th className="py-3 px-6 text-left">Nama Produk</th>
                <th className="py-3 px-6 text-left">Status</th>
                {/* <th className="py-3 px-6 text-left">Image</th> */}
              </tr>
            </thead>
            <tbody
              style={{ backgroundColor: "white" }}
              className="text-gray-600 text-sm sm:text-base font-normal"
            >
              {products.map((p, index) => (
                <tr
                  key={`${p.id}-${index}`}
                  className="border-b border-gray-300 hover:bg-gray-100"
                >
                  <td className="py-3 px-6">{p.namaProduk}</td>
                  <td className="py-3 px-6">{p.status}</td>
                  {/* <td className="py-3 px-6">
                    <img
                      src={p.image}
                      alt={p.namaProduk}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardAdmin;
