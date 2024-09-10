import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase/Firebase";
import SidebarAdmin from "../../components/Sidebar";

const DetailPage = () => {
    const { id } = useParams();
    const [qualityTinggi, setQualityTinggi] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("ID:", id);
    
        if (token) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`http://localhost:7000/api/kualitas_tinggi/${id}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    console.log("Data dari API:", response.data);
                    const productData = response.data.data;
                    const imagePath = productData.image; 
                    const imageRef = ref(storage, imagePath);
                    console.log("Path gambar Firebase:", imagePath);
                    
                    const imageUrl = await getDownloadURL(imageRef);
                    console.log("URL gambar:", imageUrl);

                    setQualityTinggi({ ...productData, image: imageUrl });
                } catch (error) {
                    console.error("Error fetching product details: ", error);
                }
            };
    
            fetchData();
        }
    }, [id]);

    const batal = () => {
        navigate("/kualitastinggi");
    };

    return (
        <div className="flex flex-col md:flex-row h-screen">
            <div className="sidebar w-full md:w-64">
                <SidebarAdmin />
            </div>

            {/* Main Content */}
            <div className="content-page max-h-screen container p-8 min-h-screen">
                <h1 className="judul text-3xl font-semibold">Detail Produk</h1>
                <div 
                    style={{ backgroundColor: "white" }}
                    className="add-guru mt-12 md:mt-11 bg-white p-5 mr-0 md:ml-8 border border-gray-200 rounded-xl shadow-lg"
                >
                    <p className="text-lg sm:text-xl text-black font-medium mb-4 sm:mb-7">
                       Detail Produk
                    </p>
                    <div className="p-4 border-t border-gray-300 mx-auto">
                        {qualityTinggi && (
                            <div>
                                <img
                                    src={qualityTinggi.image}
                                    alt={qualityTinggi.namaProduk}
                                    className="w-32 h-32 object-cover mb-2 mx-auto"
                                />
                                <p><strong>Nama Produk:</strong> {qualityTinggi.namaProduk}</p>
                                <p><strong>Status:</strong> {qualityTinggi.status}</p>
                                <p><strong>Layanan:</strong> {qualityTinggi.layanan}</p>
                                <p><strong>Jenis Proyek:</strong> {qualityTinggi.jenisProyek}</p>
                                <p><strong>Cash/Kredit:</strong> {qualityTinggi.cashKredit}</p>
                                <p><strong>Deskripsi:</strong> {qualityTinggi.detailProdukKualitasTinggi.deskripsi}</p>
                                <p><strong>Kategori:</strong> {qualityTinggi.kategoriProduk.namaKategori}</p>
                                <p><strong>Stok:</strong> {qualityTinggi.detailProdukKualitasTinggi.stokProduk}</p>
                                <p><strong>Harga:</strong> {qualityTinggi.detailProdukKualitasTinggi.hargaProduk}</p>
                                <p><strong>Tanggal:</strong> {qualityTinggi.tanggal}</p>
                            </div>
                        )}
                    </div>
                    <div className="flex justify-between mt-6">
                        <button
                            type="button"
                            onClick={batal}
                            className="block w-20 sm:w-24 rounded-lg text-black outline outline-red-500 py-3 text-sm sm:text-sm font-medium"
                        >
                            Batal
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailPage;