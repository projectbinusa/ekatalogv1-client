import axios from "axios";
import React, { useEffect, useState } from "react";
import '@fontsource/poppins';
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import SidebarAdmin from "../../components/Sidebar";

const  UploadImageNonTkdn = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const [data, setData] = useState({
        namaProduk: "",
        jenisProyek: "",
        layanan: "",
        status: "",
        cashKredit: "",
        tanggal: "",
        kategoriProduk: "",
        detailProdukKualitasTinggi: ""
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
                detailProdukKualitasTinggi,
                kategoriProduk
              } = response.data.data;
    
              setData({
                namaProduk,
                jenisProyek,
                layanan,
                status,
                cashKredit,
                tanggal: tanggal.slice(0, 10), 
                detailProdukKualitasTinggi: detailProdukKualitasTinggi.deskripsi, 
                kategoriProduk: kategoriProduk.namaKategori
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

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setImagePreview(objectUrl);
        } else {
            setImagePreview(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append("foto", selectedFile);

        try {
            const response = await axios.post(`http://localhost:7000/api/kualitas_tinggi/upload_image/${id}`, formData, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "multipart/form-data"
                }
            });

            Swal.fire({
                icon: 'success',
                title: 'Image uploaded successfully',
                showConfirmButton: true
            }).then(() => {
                navigate('/kualitastinggi');
            });

            console.log("Image uploaded successfully:", response.data);
        } catch (error) {
            setError("Error uploading image");
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error uploading image',
                showConfirmButton: true
            });
            console.error("Error uploading image:", error);
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
                <h1 className="judul text-3xl font-semibold">Upload Image</h1>
                <div className="flex flex-col md:flex-row gap-6 mt-12">
                    {/* Card for displaying data */}
                    <div className="bg-white p-5 border border-gray-200 rounded-xl shadow-lg flex-1">
                        <h2 className="text-xl font-semibold mb-4">Product Details</h2>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="flex items-center">
                                <p className="text-sm sm:text-sm font-medium text-gray-900 w-1/3">Nama Produk :</p>
                                <p className="text-gray-700 w-2/3">{data.namaProduk}</p>
                            </div>
                            <div className="flex items-center">
                                <p className="text-sm sm:text-sm font-medium text-gray-900 w-1/3">Jenis Proyek :</p>
                                <p className="text-gray-700 w-2/3">{data.jenisProyek}</p>
                            </div>
                            <div className="flex items-center">
                                <p className="text-sm sm:text-sm font-medium text-gray-900 w-1/3">Layanan :</p>
                                <p className="text-gray-700 w-2/3">{data.layanan}</p>
                            </div>
                            <div className="flex items-center">
                                <p className="text-sm sm:text-sm font-medium text-gray-900 w-1/3">Status :</p>
                                <p className="text-gray-700 w-2/3">{data.status}</p>
                            </div>
                            <div className="flex items-center">
                                <p className="text-sm sm:text-sm font-medium text-gray-900 w-1/3">Cash Kredit :</p>
                                <p className="text-gray-700 w-2/3">{data.cashKredit}</p>
                            </div>
                            <div className="flex items-center">
                                <p className="text-sm sm:text-sm font-medium text-gray-900 w-1/3">Tanggal :</p>
                                <p className="text-gray-700 w-2/3">{data.tanggal}</p>
                            </div>
                            <div className="flex items-center">
                                <p className="text-sm sm:text-sm font-medium text-gray-900 w-1/3">Kategori Produk :</p>
                                <p className="text-gray-700 w-2/3">{data.kategoriProduk}</p>
                            </div>
                            <div className="flex items-center">
                                <p className="text-sm sm:text-sm font-medium text-gray-900 w-1/3">Deskripsi :</p>
                                <p className="text-gray-700 w-2/3">{data.detailProdukKualitasTinggi}</p>
                            </div>
                        </div>  
                    </div>  
                    {/* Card for uploading image */}
                    <div className="bg-white p-5 border border-gray-200 rounded-xl shadow-lg flex-1">
                        <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="relative">
                                <label
                                    htmlFor="foto"
                                    className="block mb-2 text-sm sm:text-sm font-medium text-gray-900"
                                >
                                    Upload Foto
                                </label>
                                <input
                                    type="file"
                                    id="foto"
                                    name="foto"
                                    accept="foto/*"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    onChange={handleFileChange}
                                    required
                                />
                            </div>
                            {error && <p className="text-red-500 mt-2">{error}</p>}
                            {/* Display the selected image */}
                            {imagePreview && (
                                <div className="mt-4 flex justify-center">
                                    <img
                                        src={imagePreview}
                                        alt="Selected Preview"
                                        className="w-32 h-32 object-cover rounded-lg"
                                    />
                                </div>
                            )}
                            <div className="flex justify-between mt-10">
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
        </div>
    );
};

export default UploadImageNonTkdn;