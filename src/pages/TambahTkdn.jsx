import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SidebarAdmin from "../components/Sidebar";

const TambahTkdn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    namaProduk: "",
    kategoriProduk: "",
    deskripsiProduk: "",
    harga: "",
    status: "",
  });
  const [kategoriOptions, setKategoriOptions] = useState([]);
  const [produkDetailOptions, setProdukDetailOptions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:7000/api/kategori_produk", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data && Array.isArray(response.data.data)) {
          setKategoriOptions(response.data.data);
        } else {
          console.error("Unexpected response format:", response.data);
          setKategoriOptions([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setError("Failed to fetch categories.");
        setKategoriOptions([]);
      });

    axios
      .get("http://localhost:7000/api/detail_produk/kualitas_standar", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data && Array.isArray(response.data.data)) {
          setProdukDetailOptions(response.data.data);
        } else {
          console.error("Unexpected response format:", response.data);
          setProdukDetailOptions([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setError("Failed to fetch product details.");
        setProdukDetailOptions([]);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError(null); // Clear error when user starts changing input
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "kategoriProduk") {
      const selectedDetail = produkDetailOptions.find(
        (detail) => detail.kategoriProduk === value
      );

      if (selectedDetail) {
        setFormData((prev) => ({
          ...prev,
          deskripsiProduk: selectedDetail.deskripsi || "", // Default to empty if null/undefined
          harga: selectedDetail.hargaProduk || "", // Default to empty if null/undefined
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          deskripsiProduk: "",
          harga: "",
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      // Mencari idKategoriProduk berdasarkan namaKategori yang dipilih oleh pengguna
      const idKategoriProduk = kategoriOptions.find(
        (kategori) => kategori.namaKategori === formData.kategoriProduk
      )?.id;

      // Validasi apakah idKategoriProduk ditemukan
      if (!idKategoriProduk) {
        setError(
          "Kategori tidak valid atau tidak ditemukan. Silakan pilih kategori yang tersedia."
        );
        setLoading(false);
        return;
      }

      // Membuat objek data yang akan dikirim ke backend
      const requestData = {
        namaProduk: formData.namaProduk,
        idKategoriProduk: idKategoriProduk, // Menggunakan idKategoriProduk yang telah ditemukan
        deskripsiProduk: formData.deskripsiProduk,
        harga: formData.harga,
        status: formData.status,
        tanggal: new Date().toISOString(),
      };

      // Mengirim data ke backend
      const response = await axios.post(
        "http://localhost:7000/api/kualitas_standar/add",
        requestData,
        {
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Data successfully added:", response.data);
      navigate("/kualitasstandar");
    } catch (error) {
      console.error("Error adding data:", error);
      setError("Gagal menambahkan data. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const batal = () => {
    navigate("/kualitasstandar");
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="sidebar w-full md:w-64">
        <SidebarAdmin />
      </div>
      <div className="content-page max-h-screen container p-8 min-h-screen">
        <h1 className="judul text-3xl font-semibold">Tambah Tkdn</h1>
        <div
          style={{ backgroundColor: "white" }}
          className="add-guru mt-12 md:mt-11 bg-white p-5 mr-0 md:ml-8 border border-gray-200 rounded-xl shadow-lg"
        >
          <p className="text-lg sm:text-xl text-black font-medium mb-4 sm:mb-7">
            Tambah Tkdn
          </p>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-2">
              <div className="relative">
                <label
                  htmlFor="namaProduk"
                  className="block mb-2 text-sm sm:text-sm font-medium text-gray-900"
                >
                  Nama Produk
                </label>
                <input
                  type="text"
                  id="namaProduk"
                  name="namaProduk"
                  value={formData.namaProduk}
                  onChange={handleChange}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Masukkan Nama Produk"
                  required
                  autoComplete="off"
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="kategoriProduk"
                  className="block mb-2 text-sm sm:text-sm font-medium text-gray-900"
                >
                  Kategori
                </label>
                <select
                  id="kategoriProduk"
                  name="kategoriProduk"
                  value={formData.kategoriProduk}
                  onChange={handleChange}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                >
                  <option value="" disabled>
                    Pilih Kategori
                  </option>
                  {Array.isArray(kategoriOptions) &&
                    kategoriOptions.map((kategori) => (
                      <option key={kategori.id} value={kategori.namaKategori}>
                        {kategori.namaKategori}
                      </option>
                    ))}
                </select>
              </div>
              <div className="relative">
                <label
                  htmlFor="deskripsiProduk"
                  className="block mb-2 text-sm sm:text-sm font-medium text-gray-900"
                >
                  Deskripsi Produk
                </label>
                <input
                  type="text"
                  id="deskripsiProduk"
                  name="deskripsiProduk"
                  value={formData.deskripsiProduk}
                  onChange={handleChange}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Deskripsi Produk"
                  required
                  autoComplete="off"
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="harga"
                  className="block mb-2 text-sm sm:text-sm font-medium text-gray-900"
                >
                  Harga
                </label>
                <input
                  type="text"
                  id="harga"
                  name="harga"
                  value={formData.harga}
                  onChange={handleChange}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Masukkan Harga"
                  required
                  autoComplete="off"
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="status"
                  className="block mb-2 text-sm sm:text-sm font-medium text-gray-900"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                >
                  <option value="" disabled>
                    Pilih Status
                  </option>
                  <option value="Tersedia">Tersedia</option>
                  <option value="Kosong">Kosong</option>
                </select>
              </div>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={batal}
                className="block w-20 sm:w-24 rounded-lg text-black outline outline-red-500 py-3 text-sm sm:text-sm font-medium"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`block w-20 sm:w-24 rounded-lg text-black outline outline-blue-700 py-3 text-sm sm:text-sm font-medium ${
                  loading ? "bg-gray-300 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Loading..." : "Simpan"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TambahTkdn;
