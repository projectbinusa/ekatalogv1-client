import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import komputer from "../assets/logo/komputer.gif";
import EC from "../assets/logo/EC.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [role, setRole] = useState("admin");

  const navigate = useNavigate(); // Hook untuk navigasi

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      username: username,
      password: password,
      role: role,
    };

    try {
      const response = await axios.post(
        `http://localhost:7000/api/pengguna/login`,
        data
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berhasil Login",
          showConfirmButton: false,
          timer: 1500,
        });

        const userData = response.data.data.userData;

        // Simpan data ke localStorage
        localStorage.setItem("id", userData.idPengguna); // Perbarui dengan nama properti yang benar
        localStorage.setItem("role", userData.rolePengguna); // Perbarui dengan nama properti yang benar
        localStorage.setItem("token", response.data.data.token);

        // Redirect menggunakan navigate
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("Terjadi kesalahan saat login. Coba lagi nanti.");
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Terjadi kesalahan saat login. Coba lagi nanti.",
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-5 lg:px-0 bg-gradient-to-r bg-gray-100 cursor-pointer">
      <div className="max-w-screen-lg bg-white border border-gray-200 sm:rounded-lg shadow-lg rounded-lg flex justify-center flex-1">
        <div className="hidden md:flex md:flex-1 bg-gray-100 text-center">
          <div className="m-8 xl:m-12 w-full flex items-center justify-center">
            <img
              src={komputer}
              className="w-72 h-72 rounded-lg"
              alt="Komputer"
            />
          </div>
        </div>
        <div className="lg:w-2/4 xl:w-2/4 p-8 sm:p-8">
          <div className="flex flex-col items-center">
            <div className="text-center">
              <img
                className="mx-auto h-24 w-auto"
                src={EC}
                alt="Excellent Logo"
              />
              <h1 className="text-xl xl:text-3xl font-extrabold text-sky-600 my-2">
                E-KATALOG
              </h1>
            </div>
            <div className="w-full md:w-80 mt-6">
              <form
                className="mx-auto max-w-md md:max-w-full md:w-full flex flex-col gap-3"
                onSubmit={handleLogin}
              >
                <div>
                  <label
                    htmlFor="username"
                    className="block text-gray-700 mb-1 font-medium"
                  >
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    autoComplete="off"
                    placeholder="Masukan Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>
                <div className="mb-6 relative">
                  <label
                    htmlFor="password"
                    className="block text-gray-700 mb-1 font-medium"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="off"
                    placeholder="Masukan Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                  </button>
                  <p className="text-red-800 text-xs mb font-medium">
                    *password harus terdiri minimal 8 karakter
                  </p>
                </div>
                {errorMessage && (
                  <p className="text-red-500 text-xs mb-3">{errorMessage}</p>
                )}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-sans py-3 px-6 mb-5 mt-1 rounded-full shadow-lg transform hover:scale-105 transition duration-300"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
