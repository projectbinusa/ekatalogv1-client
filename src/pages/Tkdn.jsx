import React from "react";
import { Link } from "react-router-dom";
import KB from "./../assets/logo/1.png";
import MNTR from "./../assets/logo/2.png";
import PJTR from "./../assets/logo/3.png";
import KBM from "./../assets/logo/4.png";
import PC from "./../assets/logo/5.png";
import PCSet from "./../assets/logo/6.png";

function TKDN() {
  return (
    <>
      <h1 className="text-center text-3xl font-bold mt-6 mb-8block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">
        Silahkan Pilih Produk
      </h1>
      {/* Product List Component */}
      <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        {[
          { src: KB, alt: "Keyboard", label: "Keyboard" },
          { src: MNTR, alt: "Monitor", label: "Monitor" },
          { src: PJTR, alt: "Proyektor", label: "Proyektor" },
          { src: KBM, alt: "Keyboard Mouse", label: "Keyboard Mouse" },
          { src: PC, alt: "CPU", label: "CPU" },
          { src: PCSet, alt: "PC Set", label: "PC Setup" },
        ].map((product, index) => (
          <Link key={index} to="/cardproduct">
            <div className="group block overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <img
                src={product.src}
                alt={product.alt}
                className="w-full h-48 object-cover transition-transform duration-300 transform group-hover:scale-105"
              />
              <div className="p-4 bg-white">
                <h3 className="text-center font-medium text-gray-900">
                  {product.label}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {/* End Product List Component */}
      {/* Button Back */}
      <div className="flex justify-center mt-8 mb-10">
        <Link to="/">
          <button className="px-20 py-4 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 rounded-full shadow-lg transform hover:scale-105 transition duration-300">
            Go Back Home
          </button>
        </Link>
      </div>
      {/* End Button Back */}
    </>
  );
}

export default TKDN;
