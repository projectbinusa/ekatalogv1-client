import React, { useEffect, useState } from "react";
import SidebarAdmin from "../../components/Sidebar";
import axios from "axios";
import Swal from "sweetalert2";

const Profile = () => {
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    const [selectedImage, setSelectedImage] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState(
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQdztTDcpZ2pFqwWDYwSXbvZq5nzJYg5cn8w&s"
    );

    const [formData, setFormData] = useState({
        usernamePengguna: "",
        namaPengguna: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`http://localhost:7000/api/pengguna/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (response.data.data) {
                    const {
                        usernamePengguna,
                        namaPengguna,
                        foto,
                    } = response.data.data;

                    setFormData({
                        usernamePengguna,
                        namaPengguna,
                    });
                    setPreviewImage(foto || "https://via.placeholder.com/150");
                }
            } catch (error) {
                setError("Error fetching data");
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, token]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);

        // Preview the selected image
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleUpdateData = async () => {
        try {
            const response = await axios.put(`http://localhost:7000/api/pengguna/${id}`, formData, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            Swal.fire({
                icon: "success",
                text: "Data pengguna berhasil diperbarui.",
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Gagal!',
                text: 'Terjadi kesalahan saat memperbarui data.',
            });
            console.error("Error updating data:", error);
        }
    };

    const handleUpdateImage = async () => {
        const formDataToSend = new FormData();
        if (selectedImage) {
            formDataToSend.append("foto", selectedImage);
        }

        try {
            const response = await axios.put(`http://localhost:7000/api/pengguna/update_image/${id}`, formDataToSend, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            Swal.fire({
                icon: "success",
                text: "Gambar berhasil diperbarui.",
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Gagal!',
                text: 'Terjadi kesalahan saat memperbarui gambar.',
            });
            console.error("Error updating image:", error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col sm:flex-row">
            <div className="sidebar w-full md:w-64">
                <SidebarAdmin />
            </div>
            <div className="content-page flex-grow p-8 mt-8 flex gap-4">
                {/* Card untuk Update Gambar */}
                <div className="bg-white p-5 mb-9 border border-gray-200 rounded-xl shadow-lg w-full md:w-1/2 mt-6">
                    <h2 className="text-lg font-semibold mb-4">Update Gambar</h2>
                    <div className="flex-grow flex flex-col items-center justify-center">
                        <img
                            src={previewImage}
                            alt="Profile Preview"
                            className="w-32 h-32 rounded-full object-cover mb-4"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
                        />
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                    </div>
                    <div className="flex justify-end mt-4">
                        <button
                            onClick={handleUpdateImage}
                            className={`block w-20 sm:w-24 rounded-lg text-black outline outline-blue-700 py-2 text-sm font-medium`}
                        >
                            Simpan
                        </button>
                    </div>
                </div>

                {/* Card untuk Update Data */}
                <div className="bg-white p-5 mb-9 border border-gray-200 rounded-xl shadow-lg w-full md:w-1/2 mt-6">
                    <h2 className="text-lg font-semibold mb-4">Update Data Pengguna</h2>
                    <div className="flex-grow">
                        <div className="relative mb-4">
                            <label
                                htmlFor="namaPengguna"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Nama Pengguna
                            </label>
                            <input
                                type="text"
                                id="namaPengguna"
                                name="namaPengguna"
                                value={formData.namaPengguna}
                                onChange={(e) => setFormData({ ...formData, namaPengguna: e.target.value })}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="masukkan nama pengguna"
                                required
                                autoComplete="off"
                            />
                        </div>
                        <div className="relative mb-4">
                            <label
                                htmlFor="usernamePengguna"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Username Pengguna
                            </label>
                            <input
                                type="text"
                                id="usernamePengguna"
                                name="usernamePengguna"
                                value={formData.usernamePengguna}
                                onChange={(e) => setFormData({ ...formData, usernamePengguna: e.target.value })}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="masukkan username pengguna"
                                required
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                    <div className="flex justify-end mt-6">
                        <button
                            onClick={handleUpdateData}
                            className={`block w-20 sm:w-24 rounded-lg text-black outline outline-blue-700 py-2 text-sm font-medium`}
                        >
                            Simpan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;