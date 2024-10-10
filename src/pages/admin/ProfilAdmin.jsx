import React, { useEffect, useState } from "react";
import SidebarAdmin from "../../components/Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";
import EditPassword from "./EditPassword";

const ProfilAdmin = () => {
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    const [userData, setUserData] = useState(null);
    const [showUpdatePassword, setShowUpdatePassword] = useState(false); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:7000/api/pengguna/${id}`,
                    {
                        headers: {
                          accept: "*/*",
                          Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setUserData(response.data.data);
                if (response.data.data.imageUrl) {
                    setPreviewImage(response.data.data.imageUrl);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [id]);

    const handleUpdatePasswordClick = () => {
        setShowUpdatePassword(true); 
    };

    const handleCloseUpdatePassword = () => {
        setShowUpdatePassword(false);
    };

    return (
        <div className="min-h-screen flex flex-col sm:flex-row">
            <div className="sidebar w-full md:w-64">
                <SidebarAdmin />
            </div>
            <div className="content-page flex-grow p-8 mt-8 flex gap-4">
                {/* Card untuk Update Gambar */}
                <div className="bg-white p-5 mb-9 border border-gray-200 rounded-xl shadow-lg w-full md:w-1/2 mt-6">
                    <h2 className="text-lg font-semibold mb-4">Profil Pengguna</h2>
                    <div className="flex-grow flex flex-col items-center justify-center">
                        {userData && userData.foto ? ( 
                            <img
                                src={userData.foto}
                                alt="Profile Preview"
                                className="w-32 h-32 rounded-full object-cover mb-4"
                            />
                        ) : (
                            <p>Loading image...</p> 
                        )}
                    </div>
                </div>
                {/* Card untuk Update Data */}
                <div className="bg-white p-5 mb-9 border border-gray-200 rounded-xl shadow-lg w-full md:w-1/2 mt-6">
                    <h2 className="text-lg font-semibold mb-4">Data Pengguna</h2>
                    <div className="flex-grow">
                        {userData ? (
                            <>
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
                                        value={userData.namaPengguna}
                                        readOnly
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
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
                                        value={userData.usernamePengguna}
                                        readOnly
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                    />
                                </div>
                                <div className="relative mb-4">
                                    <label
                                        htmlFor="rolePengguna"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Role Pengguna
                                    </label>
                                    <input
                                        type="text"
                                        id="rolePengguna"
                                        name="rolePengguna"
                                        value={userData.rolePengguna}
                                        readOnly
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                    />
                                </div>
                                <div className="flex justify-end mt-10">
                                    <Link
                                        to={`/updateprofil/${id}`}
                                        className="bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Update Profil
                                    </Link>
                                   <button
                                        onClick={handleUpdatePasswordClick}
                                        className="bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-6"
                                    >
                                        Update Password
                                    </button>
                                </div>
                            </>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </div>
                {showUpdatePassword && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-10 flex justify-center items-center">
                        <div className="absolute inset-0" onClick={handleCloseUpdatePassword}></div>
                        <div className="relative bg-white p-5 rounded-lg shadow-lg z-20 w-full max-w-md mx-auto">
                            <EditPassword onClose={handleCloseUpdatePassword} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProfilAdmin;