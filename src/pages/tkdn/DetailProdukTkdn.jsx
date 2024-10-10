import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import SidebarAdmin from "../../components/Sidebar";

const DetailProdukTkdn = () => {
    const { id } = useParams();
    const [qualityStandar, setQualityStandar] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("ID:", id);
    
        if (token) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`http://localhost:7000/api/kualitas_standar/${id}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    console.log("Data dari API:", response.data);
                    const productData = response.data.data;
                    // const imagePath = productData.image; 
                    // const imageRef = ref(storage, imagePath);
                    // console.log("Path gambar Firebase:", imagePath);
                    
                    // const imageUrl = await getDownloadURL(imageRef);
                    // console.log("URL gambar:", imageUrl);

                    setQualityStandar({ ...productData /*, image: imageUrl */ });
                } catch (error) {
                    console.error("Error fetching product details: ", error);
                }
            };
    
            fetchData();
        }
    }, [id]); 

    const batal = () => {
        navigate("/kualitasstandar");
    };

    return (
        <div className="flex flex-col md:flex-row h-screen">
            <div className="sidebar w-full md:w-64">
                <SidebarAdmin />
            </div>

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
                        {qualityStandar && (
                            <div className="flex flex-col md:flex-row items-center md:items-start">
                                <div className="md:w-1/3 p-4 flex justify-center">
                                    <img
                                        src={qualityStandar.foto}
                                        alt={qualityStandar.namaProduk}
                                        className="w-48 h-48 object-cover mb-2"
                                    />
                                </div>
                                <div className="md:w-2/3 p-4">
                                    <p><strong>Nama Produk:</strong> {qualityStandar.namaProduk}</p>
                                    <p><strong>Status:</strong> {qualityStandar.status}</p>
                                    <p><strong>Layanan:</strong> {qualityStandar.layanan}</p>
                                    <p><strong>Jenis Proyek:</strong> {qualityStandar.jenisProyek}</p>
                                    <p><strong>Deskripsi:</strong> {qualityStandar.detailProdukKualitasStandar.deskripsi}</p>
                                    <p><strong>Kategori:</strong> {qualityStandar.kategoriProduk.namaKategori}</p>
                                    <p><strong>Harga:</strong> {qualityStandar.detailProdukKualitasStandar.hargaProduk}</p>
                                </div>
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

export default DetailProdukTkdn;