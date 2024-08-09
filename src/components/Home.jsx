import React from "react";
import { Link } from "react-router-dom";
import Excellent from "../assets/logo/Excellent.jpeg";

const Home = () => {
  return (
    <>
      {/* Announcement */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 px-4 py-2 text-white shadow-md">
        <p className="text-center text-sm font-medium">
          Hanya Untuk Kamu, Buruan Klaim Voucher Diskon Up To 90% -
          <a
            href="https://wa.me/6289626050907"
            className="inline-block underline hover:text-yellow-300 ml-1"
          >
            Disini
          </a>
        </p>
      </div>
      {/* End Announcement */}

      {/* Banner */}
      <section className="bg-gray-50 text-gray-900">
        <div className="container mx-auto flex flex-col lg:flex-row items-center py-16 px-4">
          <div className="lg:w-1/2 lg:pr-12 text-center lg:text-left">
            <h1 className="text-5xl font-bold mb-4">
              SELAMAT DATANG CUSTOMER
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">
                EXCELLENT COMPUTER SEMARANG
              </span>
            </h1>
            <p className="text-lg mb-8 text-gray-700">
              Produk Kami dalam Kategori TKDN (Tingkat Komponen Dalam Negeri)
              dan NON-TKDN
            </p>
            <div className="flex justify-center lg:justify-start gap-4">
              <Link to="/tkdn">
                <button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-medium py-3 px-11 rounded-full shadow-lg transform hover:scale-105 transition duration-300">
                  TKDN
                </button>
              </Link>
              <Link to="/nontkdn">
                <button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-medium py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300">
                  NON-TKDN
                </button>
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 lg:pl-12 mt-12 lg:mt-0">
            <img
              src={Excellent}
              alt="Excellent Computer Semarang"
              className="w-full rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
            />
          </div>
        </div>
      </section>
      {/* End Banner */}
    </>
  );
};

export default Home;
