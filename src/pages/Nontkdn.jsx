import React from "react";
import { Link } from "react-router-dom";
import KB from "./../assets/logo/1.png";
import MNTR from "./../assets/logo/2.png";
import PJTR from "./../assets/logo/3.png";
import KBM from "./../assets/logo/4.png";
import PC from "./../assets/logo/5.png";
import PCSet from "./../assets/logo/6.png";

function NONTKDN() {
  return (
    <>
      <h1 className="text-center text-3xl font-bold mt-2">
        Silahkan Pilih Produk :
      </h1>
      {/* Product List Component */}
      <div className="container grid grid-cols-3 gap-8 max-w-xl mx-auto py-4">
        {/* Keyboard */}
        <Link to="/cardproduct">
          <span className="group block hover:opacity-50">
            <img
              src={KB}
              alt="Keyboard"
              className="aspect-square w-full rounded object-cover bg-cover "
            />
            <div className="mt-3">
              <h3 className="font-medium text-center text-gray-900 ">
                Keyboard
              </h3>
            </div>
          </span>
        </Link>
        {/* Monitor */}
        <Link to="/cardproduct">
          <img
            src={MNTR}
            alt="Monitor"
            className="aspect-square w-full rounded object-cover bg-cover"
          />
          <div className="mt-3">
            <h3 className="font-medium text-center text-gray-900 ">Monitor</h3>
          </div>
        </Link>
        {/* Proyektor */}
        <Link to="/cardproduct">
          <img
            src={PJTR}
            alt="Proyektor"
            className="aspect-square w-full rounded object-cover bg-cover"
          />
          <div className="mt-3">
            <h3 className="font-medium text-center text-gray-900 ">
              Proyektor
            </h3>
          </div>
        </Link>
        {/* Keyboard Mouse */}
        <Link to="/cardproduct">
          <img
            src={KBM}
            alt="Proyektor"
            className="aspect-square w-full rounded object-cover bg-cover"
          />
          <div className="mt-3">
            <h3 className="font-medium text-center text-gray-900 ">
              Keyboard Mouse
            </h3>
          </div>
        </Link>
        {/* PC */}
        <Link to="/cardproduct">
          <img
            src={PC}
            alt="CPU"
            className="aspect-square w-full rounded object-cover bg-cover"
          />
          <div className="mt-3">
            <h3 className="font-medium text-center text-gray-900 ">CPU</h3>
          </div>
        </Link>
        {/* PC Set */}
        <Link to="/cardproduct">
          <img
            src={PCSet}
            alt="PC Set"
            className="aspect-square w-full rounded object-cover bg-cover"
          />
          <div className="mt-3">
            <h3 className="font-medium text-center text-gray-900 ">PC Setup</h3>
          </div>
        </Link>
      </div>
      {/* End Product List Component */}
      {/* Button Back */}
      <Link to="/">
        <button className="container grid grid-cols-1 max-w-xl mx-auto mt-6 mb-2 rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white  hover:bg-indigo-700 focus:outline-none focus:ring">
          Go Back Home
        </button>
      </Link>
      {/* End Button Back */}
    </>
  );
}

export default NONTKDN;
