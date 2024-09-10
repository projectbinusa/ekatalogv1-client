import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import '@fontsource/poppins';
import SidebarAdmin from "../../components/Sidebar";

const TambahNonTkdn = () => {
  const [detailProduk, setDetailProduk] = useState([]);
  const [kategoriProduk, setKategoriProduk] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    namaProduk: "",
    jenisProyek: "",
    layanan: "",
    status: "",
    tanggal: "",
    cashKredit: "",
    idDetailProdukTinggi: "",
    idKategoriProduk: "",
  });

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
          setKategoriProduk(response.data.data);
        } else {
          console.error("Unexpected response format:", response.data);
          setKategoriProduk([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setError("Failed to fetch categories.");
        setKategoriProduk([]);
      });

      axios
      .get("http://localhost:7000/api/detail_produk/kualitas_tinggi", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data && Array.isArray(response.data.data)) {
          setDetailProduk(response.data.data);
        } else {
          console.error("Unexpected response format:", response.data);
          setDetailProduk([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setError("Failed to fetch product details.");
        setDetailProduk([]);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();
    setLoading(true);
    setError("");

    const token = localStorage.getItem("token");

    const dataToSend = {
      cashKredit: formData.cashKredit,  
      jenisProyek: formData.jenisProyek,
      layanan: formData.layanan,
      namaProduk: formData.namaProduk,
      cashKredit: formData.cashKredit,
      status: formData.status.toLowerCase(), 
      tanggal: formData.tanggal + "T00:00:00.000Z",
      idDetailProdukTinggi: formData.idDetailProdukTinggi, 
      idKategoriProduk: formData.idKategoriProduk,
    };

    try {
      const response = await fetch("http://localhost:7000/api/kualitas_tinggi/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, 
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        const result = await response.json();
        const idBaru = result.data.id;
        console.log("Response:", result);
        Swal.fire({
          icon: 'success',
          title: 'Berhasil',
          text: 'Data berhasil disimpan!, Silahkan upload gambar untuk menambah gambar',
          showCancelButton: true,
          confirmButtonText: 'Upload Gambar',
          cancelButtonText: 'Kembali',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate(`/uploadimagenontkdn/${idBaru}`); 
          } else {
            navigate("/kualitastinggi");
          }
        });
      } else {
        console.error("Failed to submit data");
        Swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: 'Gagal menyimpan data!',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      console.error("Error:", error);
       Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Terjadi kesalahan saat mengirim data!',
      confirmButtonText: 'OK'
    });
    } finally {
      setLoading(false);
    }
  };

  const batal = () => {
    navigate("/kualitastinggi");
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="sidebar w-full md:w-64">
        <SidebarAdmin />
      </div>
      <div className="content-page max-h-screen container p-8 min-h-screen">
        <h1 className="judul text-3xl font-semibold">Tambah Non Tkdn</h1>
        <div
          style={{ backgroundColor: "white" }}
          className="add-guru mt-12 md:mt-11 bg-white p-5 mr-0 md:ml-8 border border-gray-200 rounded-xl shadow-lg"
        >
          <p className="text-lg sm:text-xl text-black font-medium mb-4 sm:mb-7">
            Tambah Non Tkdn
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
                  placeholder="masukkan nama produk"
                  required
                  autoComplete="off"
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="jenisProyek"
                  className="block mb-2 text-sm sm:text-sm font-medium text-gray-900"
                >
                  Jenis Proyek
                </label>
                <input
                  type="text"
                  id="jenisProyek"
                  name="jenisProyek"
                  value={formData.jenisProyek}
                  onChange={handleChange}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="masukkan jenis proyek"
                  required
                  autoComplete="off"
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="layanan"
                  className="block mb-2 text-sm sm:text-sm font-medium text-gray-900"
                >
                  Layanan
                </label>
                <input
                  type="text"
                  id="layanan"
                  name="layanan"
                  value={formData.layanan}
                  onChange={handleChange}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="masukkan layanan"
                  required
                  autoComplete="off"
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="idKategoriProduk"
                  className="block mb-2 text-sm sm:text-sm font-medium text-gray-900"
                >
                  Kategori Produk
                </label>
                <select
                  id="idKategoriProduk"
                  name="idKategoriProduk"
                  value={formData.idKategoriProduk}
                  onChange={handleChange}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                >
                  <option value="" disabled>
                    Pilih Kategori
                  </option>
                  {Array.isArray(kategoriProduk) && kategoriProduk.map((kategori) => (
                    <option key={kategori.id} value={kategori.id}> 
                      {kategori.namaKategori}
                    </option>
                  ))}
                </select>
              </div>
              <div className="relative">
                <label
                  htmlFor="idDetailProdukTinggi"
                  className="block mb-2 text-sm sm:text-sm font-medium text-gray-900"
                >
                  Detail Produk
                </label>
                <select
                  id="idDetailProdukTinggi"
                  name="idDetailProdukTinggi"
                  value={formData.idDetailProdukTinggi}
                  onChange={handleChange}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                >
                  <option value="" disabled>
                    Pilih Detail Produk
                  </option>
                  {Array.isArray(detailProduk) && detailProduk.map((detail) => (
                    <option key={detail.id} value={detail.id}>
                      {detail.deskripsi}
                    </option>
                  ))}
                </select>
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
              <div className="relative">
                <label
                  htmlFor="cashKredit"
                  className="block mb-2 text-sm sm:text-sm font-medium text-gray-900"
                >
                  Cash Kredit
                </label>
                <select
                  id="cashKredit"
                  name="cashKredit"
                  value={formData.cashKredit}
                  onChange={handleChange}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                >
                  <option value="" disabled>
                    Pilih
                  </option>
                  <option value="Cash">Cash</option>
                  <option value="Kredit">Kredit</option>
                </select>
              </div>
              <div className="relative">
                <label
                  htmlFor="tanggal"
                  className="block mb-2 text-sm sm:text-sm font-medium text-gray-900"
                >
                  Tanggal
                </label>
                <input
                  type="date"
                  id="tanggal"
                  name="tanggal"
                  value={formData.tanggal}
                  onChange={handleChange}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                  autoComplete="off"
                />
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

export default TambahNonTkdn;
