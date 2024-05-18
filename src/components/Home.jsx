import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      {/* Announcement */}
      <div className="bg-indigo-600 px-4 py-3 text-white">
        <p className="text-center text-sm font-medium">
          Hanya Untuk Kamu, Buruan Klaim Voucher Diskon Up To 90% -
          <a href="wa.me/6289626050907" className="inline-block underline">
            Disini
          </a>
        </p>
      </div>
      {/* End Announcement */}
      {/* Banner */}
      <section className="bg-gray-900 text-white">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="bg-gradient-to-r from-green-300 via-indigo-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
              SELAMAT DATANG CUSTOMER
              <span className="sm:block"> EXCELLENT COMPUTER SEMARANG </span>
            </h1>

            <p className="mx-auto mt-4 max-w-xl sm:text-2xl/relaxed sm:w-66">
              Produk Kami dalam Kategori TKDN (Tingkat Komponen Dalam Negeri)
              dan NON-TKDN
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/tkdn">
                <button className="block w-full rounded border border-indigo-600 bg-indigo-600 px-2 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-40">
                  TKDN
                </button>
              </Link>
              <Link to="/nontkdn">
                <button className="block w-full rounded border border-indigo-600 bg-indigo-600 px-2 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-40">
                  NON-TKDN
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* End Banner */}
    </>
  );
};

export default Home;
