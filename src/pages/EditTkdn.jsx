import React from "react";
import SidebarAdmin from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

const EditTkdn = () => {
  const navigate = useNavigate();

  const batal = () => {
    navigate("/kualitasstandar");
  };
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="sidebar w-full md:w-64">
        <SidebarAdmin />
      </div>
      <div className="content-page max-h-screen container p-8 min-h-screen">
        <h1 className="judul text-3xl font-semibold">Update Tkdn</h1>
        <div
          style={{ backgroundColor: "white" }}
          className="add-guru mt-12 md:mt-11 bg-white p-5 mr-0 md:ml-8 border border-gray-200 rounded-xl shadow-lg"
        >
          <p className="text-lg sm:text-xl text-black font-medium mb-4 sm:mb-7">
            Update Tkdn
          </p>
          <form>
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
                  //   value={formData.namaProduk}
                  //   onChange={handleChange}
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
                  //   value={formData.kategoriProduk}
                  //   onChange={handleChange}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                >
                  <option value=" ">Pilih Kategori</option>
                  {/* {Array.isArray(kategoriOptions) &&
                    kategoriOptions.map((kategori) => (
                      <option key={kategori.id} value={kategori.namaKategori}>
                        {kategori.namaKategori}
                      </option>
                    ))} */}
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
                  //   value={formData.deskripsiProduk}
                  //   onChange={handleChange}
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
                  //   value={formData.harga}
                  //   onChange={handleChange}
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
                  //   value={formData.status}
                  //   onChange={handleChange}
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
            {/* {error && <p className="text-red-500 mt-2">{error}</p>} */}
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
                // disabled={loading}
                // className={`block w-20 sm:w-24 rounded-lg text-black outline outline-blue-700 py-3 text-sm sm:text-sm font-medium ${
                //   loading ? "bg-gray-300 cursor-not-allowed" : ""
                // }`}
              >
                {/* {loading ? "Loading..." : "Simpan"} */}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditTkdn;
