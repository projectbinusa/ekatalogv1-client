import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBarsStaggered,
  faXmark,
  faCaretDown,
  faCaretUp,
  faTags,
  faBoxOpen,
  faTachometerAlt,
} from "@fortawesome/free-solid-svg-icons";
import EC from "../assets/logo/EC.png";
import Swal from "sweetalert2";
import axios from "axios";

const SidebarAdmin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [secondDropdownOpen, setSecondDropdownOpen] = useState(false);
  const location = useLocation();
  const id = localStorage.getItem("id");
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem("token");

  const isActive = (path) => {
    return location.pathname === path;
  };

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleSecondDropdown = () => {
    setSecondDropdownOpen(!secondDropdownOpen);
  };

  const logout = () => {
    Swal.fire({
      title: "Keluar",
      text: "Anda harus login kembali apabila keluar dari aplikasi ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Keluar",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        Swal.fire({
          title: "Berhasil Keluar",
          text: "Anda telah berhasil keluar.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
          willClose: () => {
            window.location.href = "/login";
          },
        });
      }
    });
  };

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-gradient-to-r from-blue-500 to-indigo-400 border shadow-sm flex justify-between items-center px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center">
          <button
            id="sidebar-toggle"
            className="text-white focus:outline-none md:hidden mx-3"
            onClick={toggleSidebar}
          >
            {sidebarOpen ? (
              <FontAwesomeIcon icon={faXmark} size="lg" />
            ) : (
              <FontAwesomeIcon icon={faBarsStaggered} size="lg" />
            )}
          </button>
          <img src={EC} className="h-12" alt="Logo" />
          <a href="/dashboard">
            <span className="text-3xl font-medium ml-2 text-white">
              E-KATALOG
            </span>
          </a>
        </div>

        {/* Profil dropdown */}
        <div className="relative ml-3">
          <div>
            <button
              type="button"
              className="relative flex rounded-full text-sm"
              id="user-menu-button"
              aria-expanded={userMenuOpen}
              aria-haspopup="true"
              onClick={toggleUserMenu}
            >
              <span className="absolute -inset-1.5"></span>
              <span className="sr-only">Open user menu</span>
               {userData && userData.foto ? ( 
                    <img
                        src={userData.foto}
                        alt="Profile Preview"
                        className="h-9 w-9 rounded-full bg-white"
                        />
                ) : (
                    <p>Loading image...</p> 
                )}
            </button>
          </div>

          {userMenuOpen && (
            <div
              className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md py-1 bg-white"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
              tabIndex="-1"
            >
              <Link to={`/profileadmin/${id}`}>
                <button
                  className="block px-4 py-2 text-sm"
                  role="menuitem"
                  tabIndex="-1"
                  id="user-menu-item-0"
                >
                  Profile
                </button>
              </Link>
              <button
                onClick={logout}
                className="block px-4 py-2 text-sm w-full text-left"
                role="menuitem"
                tabIndex="-1"
                id="user-menu-item-2"
              >
                Keluar
              </button>
            </div>
          )}
        </div>
      </nav>

      <div
        className={`fixed top-0 left-0 z-40 w-64 h-full bg-white shadow-xl border transition-transform duration-300 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="bg-blue-800 text-white px-4 py-3">
          <h1 className="text-2xl font-semibold">E-KATALOG</h1>
        </div>
        <ul className="mt-6 text-xl mx-2">
          <li className="py-2 px-3 my-2 rounded cursor-pointer hover:bg-gray-200 hover:text-black">
            <Link to="/dashboard" className="flex items-center w-full">
              <FontAwesomeIcon
                icon={faTachometerAlt}
                className="w-7 h-7 mr-2"
              />
              <span
                style={{ fontFamily: "Poopins", fontWeight: "bold" }}
                className="mx-2 font-medium"
              >
                Dashboard
              </span>
            </Link>
          </li>
          <li className="py-2 px-3 my-2 rounded cursor-pointer hover:bg-gray-200 hover:text-black">
            <div
              className="flex items-center justify-between"
              onClick={toggleDropdown}
            >
              <div className="flex items-center">
                <FontAwesomeIcon icon={faBoxOpen} className="w-7 h-7 mr-2" />
                <span
                  style={{ fontFamily: "Poopins", fontWeight: "bold" }}
                  className="mx-2 font-medium"
                >
                  Tipe Produk
                </span>
              </div>
              <FontAwesomeIcon
                icon={dropdownOpen ? faCaretUp : faCaretDown}
                className="text-xl"
              />
            </div>
            {dropdownOpen && (
              <ul className="pl-10">
                <li
                  className={`py-2 ${
                    isActive("/kualitassedang")
                      ? "bg-gray-100 text-black"
                      : "hover:bg-gray-200 hover:text-black"
                  }`}
                >
                  <Link
                    to="/kualitasstandar"
                    className="flex items-center w-full"
                  >
                    TKDN
                  </Link>
                </li>
                <li
                  className={`py-2 ${
                    isActive("/kualitastinggi")
                      ? "bg-gray-100 text-black"
                      : "hover:bg-gray-200 hover:text-black"
                  }`}
                >
                  <Link
                    to="/kualitastinggi"
                    className="flex items-center w-full"
                  >
                    Non TKDN
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li className="py-2 px-3 my-2 rounded cursor-pointer hover:bg-gray-200 hover:text-black">
            <div
              className="flex items-center justify-between"
              onClick={toggleSecondDropdown}
            >
              <div className="flex items-center">
                <FontAwesomeIcon icon={faTags} className="w-7 h-7 mr-2" />
                <span
                  style={{ fontFamily: "Poopins", fontWeight: "bold" }}
                  className="mx-2 font-medium"
                >
                  Tipe Barang
                </span>
              </div>
              <FontAwesomeIcon
                icon={secondDropdownOpen ? faCaretUp : faCaretDown}
                className="text-xl"
              />
            </div>
            {secondDropdownOpen && (
              <ul className="pl-10">
                <li
                  className={`py-2 ${
                    isActive("/listpc")
                      ? "bg-gray-100 text-black"
                      : "hover:bg-gray-200 hover:text-black"
                  }`}
                >
                  <Link to="/listpc" className="flex items-center w-full">
                    PC
                  </Link>
                </li>
                <li
                  className={`py-2 ${
                    isActive("/listmonitor")
                      ? "bg-gray-100 text-black"
                      : "hover:bg-gray-200 hover:text-black"
                  }`}
                >
                  <Link to="/listmonitor" className="flex items-center w-full">
                    Monitor
                  </Link>
                </li>
                <li
                  className={`py-2 ${
                    isActive("/listlaptop")
                      ? "bg-gray-100 text-black"
                      : "hover:bg-gray-200 hover:text-black"
                  }`}
                >
                  <Link to="/listlaptop" className="flex items-center w-full">
                    Laptop
                  </Link>
                </li>
                <li
                  className={`py-2 ${
                    isActive("/listkeyboard")
                      ? "bg-gray-100 text-black"
                      : "hover:bg-gray-200 hover:text-black"
                  }`}
                >
                  <Link to="/listkeyboard" className="flex items-center w-full">
                    Keyboard
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <hr className="absolute bottom-14 w-60" />
        </ul>
      </div>
      <div
        className={`ml-0 md:ml-64 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "md:ml-0" : "-md:ml-64"
        }`}
      />
    </>
  );
};

export default SidebarAdmin;
