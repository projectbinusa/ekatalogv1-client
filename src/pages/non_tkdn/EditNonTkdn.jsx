import React, { useEffect, useState } from "react";
import '@fontsource/poppins';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';
import SidebarAdmin from "../../components/Sidebar";

const EditNonTkdn = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
  
    const [data, setData] = useState({
      namaProduk: "",
      jenisProyek: "",
      layanan: "",
      status: "",
      cashKredit: "",
      tanggal: "",
    });

    useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          setError(null);
          try {
            const response = await axios.get(`http://localhost:7000/api/kualitas_tinggi/${id}`, {
              headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
              }
            });
    
            if (response.data.data) {
              const { 
                namaProduk, 
                jenisProyek, 
                layanan, 
                status, 
                cashKredit, 
                tanggal, 
              } = response.data.data;
    
              setData({
                namaProduk,
                jenisProyek,
                layanan,
                status,
                cashKredit,
                tanggal: tanggal.slice(0, 10), 
              });
            }
          } catch (error) {
            setError("Error fetching data");
            console.error("Error fetching data:", error);
          } finally {
            setLoading(false); 
          }
        };

        fetchData();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true); 
        setError(null); 
        try {
          await axios.put(`http://localhost:7000/api/kualitas_tinggi/${id}`, data, {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json"
            }
          });
      
          Swal.fire({
            icon: 'success',
            title: 'Data berhasil diperbarui!',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            navigate("/kualitastinggi");
          });
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
        navigate("/kualitastinggi");
    }

    return (
        <div className="flex flex-col md:flex-row h-screen">
          <div className="sidebar w-full md:w-64">
            <SidebarAdmin />
          </div>
          
          {/* Main Content */}
          <div className="content-page max-h-screen container p-8 min-h-screen">
            <h1 className="judul text-3xl font-semibold">Update Non Tkdn</h1>
            <div
              style={{ backgroundColor: "white" }}
              className="add-guru mt-12 md:mt-11 bg-white p-5 mr-0 md:ml-8 border border-gray-200 rounded-xl shadow-lg"
            >
              <p className="text-lg sm:text-xl text-black font-medium mb-4 sm:mb-7">
                Update Non Tkdn
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
                      value={data.namaProduk}
                      onChange={(e) => setData({ ...data, namaProduk: e.target.value })}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                      value={data.jenisProyek}
                      onChange={(e) => setData({ ...data, jenisProyek: e.target.value })}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                      value={data.layanan}
                      onChange={(e) => setData({ ...data, layanan: e.target.value })}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                      value={data.status}
                      onChange={(e) => setData({ ...data, status: e.target.value })}
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
                      value={data.cashKredit}
                      onChange={(e) => setData({ ...data, cashKredit: e.target.value })}
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
                      value={data.tanggal}
                      onChange={(e) => setData({ ...data, tanggal: e.target.value })}
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

export default EditNonTkdn;