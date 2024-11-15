import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SidebarAdmin from "./Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardCheck, faPlus, faTags } from "@fortawesome/free-solid-svg-icons";

const DashboardAdmin = () => {
  const [username, setUsername] = useState("");
  const [products, setProducts] = useState([]);
  const [totalStandar, setTotalStandar] = useState(0);
  const [totalTinggi, setTotalTinggi] = useState(0);
  const [totalKategori, setTotalKategori] = useState(0);
  const limitedProducts = products.slice(0, 20);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

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
        }),
      ])
        .then((responses) => {
          const [kualitasStandarResponse, kualitasTinggiResponse] = responses;
          const kualitasStandarData = kualitasStandarResponse.data.data;
          const kualitasTinggiData = kualitasTinggiResponse.data.data;

          setProducts([...kualitasStandarData, ...kualitasTinggiData]);
          setTotalStandar(kualitasStandarData.length);
          setTotalTinggi(kualitasTinggiData.length);
        })
        .catch((error) => {
          console.error("Gagal mengambil data produk: ", error);
        });
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.get("http://localhost:7000/api/kategori_produk", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((responses) => {
        const kategoriData = responses.data.data;

        setTotalKategori(kategoriData.length);
      })
      .catch((error) => {
        console.error("Gagal mengambil data kategori: ", error);
      });
    }
  })

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="min-h-screen flex sm:flex-row bg-gray-50">
      <SidebarAdmin />
      <section className="text-gray-800 body-font flex-1 mt-20 px-4 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 mt-6">
          <div className="bg-blue-100 shadow-md rounded-lg p-6 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-blue-700 mb-2">Produk Standar</h2>
              <p className="text-3xl font-semibold text-blue-900">{totalStandar}</p>
            </div>
            <FontAwesomeIcon icon={faClipboardCheck} className="text-5xl text-blue-500" />
          </div>
          <div className="bg-green-100 shadow-md rounded-lg p-6 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-green-700 mb-2">Produk Tinggi</h2>
              <p className="text-3xl font-semibold text-green-900">{totalTinggi}</p>
            </div>
            <FontAwesomeIcon icon={faClipboardCheck} className="text-5xl text-green-500" />
          </div>
          <div className="bg-yellow-100 shadow-md rounded-lg p-6 flex justify-between items-center"> 
            <div>
              <h2 className="text-lg font-bold text-yellow-700 mb-2">Kategori</h2>
              <p className="text-3xl font-semibold text-yellow-900">{totalKategori}</p>
            </div>
            <FontAwesomeIcon icon={faTags} className="text-5xl text-yellow-500" /> 
          </div>
        </div>

        {/* Penempatan tombol dalam grid */}
        <div className="relative mb-4 self-end flex justify-end">
          <button
            onClick={toggleDropdown}
            className="bg-green-500 text-white p-2 rounded-lg flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faPlus} className="text-xl" />
          </button>
          {/* Dropdown menu */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <Link
                to={"/tambahkategori"}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Tambah Kategori
              </Link>
              <Link
                to="/tambahdetailekslusif"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Detail Produk Tinggi
              </Link>
              <Link
                to="/tambahdetailreguler"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Detail Produk Standar
              </Link>
            </div>
          )}
        </div>

        {/* Tabel Produk */}
        <div className="flex justify-center">
        <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-lg w-full max-w-5xl">
          <table className="min-w-full bg-white divide-y-2 divide-gray-200 table-fixed rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-900 text-sm sm:text-base leading-normal">
                <th className="py-3 px-6 text-left">Nama Produk</th>
                <th className="py-3 px-6 text-left">Status</th>
                {/* <th className="py-3 px-6 text-left">Image</th>  */}
              </tr>
            </thead>
            <tbody
              style={{ backgroundColor: "white" }}
              className="text-gray-600 text-sm sm:text-base font-normal"
            >
              {limitedProducts.map((p, index) => (
                <tr
                  key={`${p.id}-${index}`}
                  className="border-b border-gray-300 hover:bg-gray-100"
                >
                  <td className="py-3 px-6">{p.namaProduk}</td>
                  <td className="py-3 px-6">{p.status}</td>
                  {/* <td className="py-3 px-6">
                    <img
                      src={p.foto}
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
