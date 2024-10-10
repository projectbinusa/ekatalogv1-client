import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import Swal from "sweetalert2";

const EditPassword = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showPasswordLama, setShowPasswordLama] = useState(false);
    const [showPasswordBaru, setShowPasswordBaru] = useState(false);
    const [showKonfirmasiPassword, setShowKonfirmasiPassword] = useState(false);
    const [formData, setFormData] = useState({
        passwordLama: "", 
        passwordBaru: "",
        konfirmasiPassword: "",
    });
    const token = localStorage.getItem("token");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdateData = async () => {
        setLoading(true);
        setError(null); 

        try {
            const response = await fetch("http://localhost:7000/api/pengguna/update_password", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, 
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to update password");
            }

            const result = await response.json();
            console.log(result); 
            Swal.fire({
                icon: "success",
                title: "Berhasil",
                text: "Password berhasil diperbarui!",
            });

        } catch (error) {
            setError(error.message);
            Swal.fire({
                icon: "error",
                title: "Gagal",
                text: error.message || "Gagal memperbarui password!",
            });
        } finally {
            setLoading(false);
        }
    };

    const toggleShowPasswordLama = () => {
        setShowPasswordLama(!showPasswordLama);
    };

    const toggleShowPasswordBaru = () => {
        setShowPasswordBaru(!showPasswordBaru);
    };

    const toggleShowKonfirmasiPassword = () => {
        setShowKonfirmasiPassword(!showKonfirmasiPassword);
    };

    return (
        <div className="p-5">
            <h2 className="text-lg font-semibold mb-4">Update Password</h2>
                <div className="flex-grow">
                    <div className="relative mb-4">
                        <label
                            htmlFor="passwordLama"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Password Lama Pengguna
                        </label>
                        <input
                            type={showPasswordLama ? "text" : "password"}
                            id="passwordLama"
                            name="passwordLama"
                            value={formData.passwordLama}
                            onChange={handleChange}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10"
                            required
                            autoComplete="off"
                        />
                        <button
                            type="button"
                            onClick={toggleShowPasswordLama}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                        >
                            <FontAwesomeIcon icon={showPasswordLama ? faEye : faEyeSlash} />
                        </button>
                    </div>
                    <div className="relative mb-4">
                        <label
                            htmlFor="passwordBaru"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Password Baru Pengguna
                        </label>
                        <input
                            type={showPasswordBaru ? "text" : "password"}
                            id="passwordBaru"
                            name="passwordBaru"
                            value={formData.passwordBaru}
                            onChange={handleChange}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10"
                            required
                            autoComplete="off"
                        />
                        <button
                            type="button"
                            onClick={toggleShowPasswordBaru}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                        >
                            <FontAwesomeIcon icon={showPasswordBaru ? faEye : faEyeSlash} />
                        </button>
                    </div>
                    <div className="relative mb-4">
                        <label
                            htmlFor="konfirmasiPassword"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Konfirmasi Password Baru Pengguna
                        </label>
                        <input
                            type={showKonfirmasiPassword ? "text" : "password"}
                            id="konfirmasiPassword"
                            name="konfirmasiPassword"
                            value={formData.konfirmasiPassword}
                            onChange={handleChange}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10"
                            required
                            autoComplete="off"
                        />
                        <button
                            type="button"
                            onClick={toggleShowKonfirmasiPassword}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                        >
                            <FontAwesomeIcon icon={showKonfirmasiPassword ? faEye : faEyeSlash} />
                        </button>
                    </div>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <div className="flex justify-end mt-6">
                <button
                    onClick={handleUpdateData} 
                    className={`block w-20 sm:w-24 rounded-lg text-black outline outline-blue-700 py-2 text-sm font-medium`}
                    disabled={loading}
                >
                    {loading ? "Menyimpan..." : "Simpan"}
                </button>
            </div>
        </div>
    );
};

export default EditPassword;