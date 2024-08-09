import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBarsStaggered,
  faXmark,
  faChevronDown,
  faChevronUp,
  faCaretDown,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";
import EC from "../assets/logo/EC.png";
import Swal from "sweetalert2";
import { pengguna } from "./Api";

const SidebarAdmin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [secondDropdownOpen, setSecondDropdownOpen] = useState(false);
  const location = useLocation();
  const id = localStorage.getItem("id");
  const [profilePic, setProfilePic] = useState(
    "https://kimia.fkip.usk.ac.id/wp-content/uploads/2017/10/1946429.png"
  );

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const adminData = await pengguna(id);
        if (adminData.image) {
          setProfilePic(adminData.image);
        }
      } catch (error) {
        console.error("Failed to fetch admin:", error);
      }
    };

    fetchAdmin();
  }, [id]);

  const isActive = (path) => {
    return location.pathname === path;
  };

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
      <nav className="fixed top-0 z-50 w-full bg-gradient-to-r from-blue-600 to-indigo-500 border shadow-sm flex justify-between items-center px-3 py-3 lg:px-5 lg:pl-3">
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
              <img
                className="h-9 w-9 rounded-full bg-white"
                src={profilePic}
                alt=""
              />
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
              <Link to="/profile_admin">
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
              <svg
                className="w-7 h-7 mr-2"
                fill="none"
                strokeWidth="20.5"
                stroke="currentColor"
                viewBox="0 0 576 512"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M304 240l0-223.4c0-9 7-16.6 16-16.6C443.7 0 544 100.3 544 224c0 9-7.6 16-16.6 16L304 240zM32 272C32 150.7 122.1 50.3 239 34.3c9.2-1.3 17 6.1 17 15.4L256 288 412.5 444.5c6.7 6.7 6.2 17.7-1.5 23.1C371.8 495.6 323.8 512 272 512C139.5 512 32 404.6 32 272zm526.4 16c9.3 0 16.6 7.8 15.4 17c-7.7 55.9-34.6 105.6-73.9 142.3c-6 5.6-15.4 5.2-21.2-.7L320 288l238.4 0z"
                ></path>
              </svg>
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
                <svg
                  className="w-7 h-7 mr-2"
                  fill="none"
                  strokeWidth="10.5"
                  stroke="currentColor"
                  viewBox="0 0 576 512"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M0 128C0 92.7 28.7 64 64 64l448 0c35.3 0 64 28.7 64 64l0 64c0 8.8-7.4 15.7-15.7 18.6C541.5 217.1 528 235 528 256s13.5 38.9 32.3 45.4c8.3 2.9 15.7 9.8 15.7 18.6l0 64c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64l0-64c0-8.8 7.4-15.7 15.7-18.6C34.5 294.9 48 277 48 256s-13.5-38.9-32.3-45.4C7.4 207.7 0 200.8 0 192l0-64z"
                  ></path>
                </svg>
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
                    isActive("/guru")
                      ? "bg-gray-100 text-black"
                      : "hover:bg-gray-200 hover:text-black"
                  }`}
                >
                  <Link to="/guru" className="flex items-center w-full">
                    Kualitas Tinggi
                  </Link>
                </li>
                <li
                  className={`py-2 ${
                    isActive("/siswa")
                      ? "bg-gray-100 text-black"
                      : "hover:bg-gray-200 hover:text-black"
                  }`}
                >
                  <Link to="/siswa" className="flex items-center w-full">
                    Kualitas Sedang
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
                <svg
                  className="w-7 h-7 mr-2"
                  fill="none"
                  strokeWidth="20.5"
                  stroke="currentColor"
                  viewBox="0 0 576 512"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M315.4 15.5C309.7 5.9 299.2 0 288 0s-21.7 5.9-27.4 15.5l-96 160c-5.9 9.9-6.1 22.2-.4 32.2s16.3 16.2 27.8 16.2l192 0c11.5 0 22.2-6.2 27.8-16.2s5.5-22.3-.4-32.2l-96-160zM288 312l0 144c0 22.1 17.9 40 40 40l144 0c22.1 0 40-17.9 40-40l0-144c0-22.1-17.9-40-40-40l-144 0c-22.1 0-40 17.9-40 40zM128 512a128 128 0 1 0 0-256 128 128 0 1 0 0 256z"
                  ></path>
                </svg>
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
                    isActive("/kategori1")
                      ? "bg-gray-100 text-black"
                      : "hover:bg-gray-200 hover:text-black"
                  }`}
                >
                  <Link to="/kategori1" className="flex items-center w-full">
                    Kategori 1
                  </Link>
                </li>
                <li
                  className={`py-2 ${
                    isActive("/kategori2")
                      ? "bg-gray-100 text-black"
                      : "hover:bg-gray-200 hover:text-black"
                  }`}
                >
                  <Link to="/kategori2" className="flex items-center w-full">
                    Kategori 2
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
