import React, { useState } from "react";
import SidebarAdmin from "../../components/Sidebar";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const TambahKategori = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        namaKategori: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

       const token = localStorage.getItem("token");

       const dataToSend = {
        namaKategori: formData.namaKategori,
       };

       try {
        const response = await fetch("http://localhost:7000/api/kategori_produk/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(dataToSend),
        });

        if (response.ok) {
            const result = await response.json();
            console.log("Response:", result);
            Swal.fire({
                icon: 'success',
                title: 'Data berhasil diperbarui!',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                navigate("/dashboard");
            });
        }
       } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Terjadi kesalahan!',
            text: 'Gagal memperbarui data.',
        });
        console.error("Error updating data:", error);
       } finally {
        setLoading(false);
       }
    };

    const batal = () => {
        navigate("/dashboard");
    };

    return (
        <div className="flex flex-col md:flex-row h-screen">
          <div className="sidebar w-full md:w-64">
            <SidebarAdmin />
          </div>
          <div className="content-page max-h-screen container p-8 min-h-screen">
            <h1 className="judul text-3xl font-semibold">Tambah Kategori</h1>
            <div
              style={{ backgroundColor: "white" }}
              className="add-guru mt-12 md:mt-11 bg-white p-5 mr-0 md:ml-8 border border-gray-200 rounded-xl shadow-lg"
            >
              <p className="text-lg sm:text-xl text-black font-medium mb-4 sm:mb-7">
                Tambah Kategori
              </p>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-2">
                  <div className="relative">
                    <label
                      htmlFor="namaKategori"
                      className="block mb-2 text-sm sm:text-sm font-medium text-gray-900"
                    >
                      Nama Kategori
                    </label>
                    <input
                      type="text"
                      id="namaKategori"
                      name="namaKategori"
                      value={formData.namaKategori}
                      onChange={handleChange}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="masukkan nama kategori"
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

export default TambahKategori;