import React from "react";
import { Link } from "react-router-dom";

function CARDPRODUCT() {
  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-center py-4 md:py-8 flex-wrap gap-4">
          <button
            type="button"
            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center dark:focus:ring-blue-800"
          >
            All Merk
          </button>
          <button
            type="button"
            className="text-gray-900 bg-white hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center dark:bg-gray-900 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            ASUS
          </button>
          <button
            type="button"
            className="text-gray-900 bg-white hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center dark:bg-gray-900 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            Lenovo
          </button>
          <button
            type="button"
            className="text-gray-900 bg-white hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center dark:bg-gray-900 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            Samsung
          </button>
          <button
            type="button"
            className="text-gray-900 bg-white hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center dark:bg-gray-900 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            ADVAN
          </button>
          <button
            type="button"
            className="text-gray-900 bg-white hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center dark:bg-gray-900 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            HP
          </button>
          <button
            type="button"
            className="text-gray-900 bg-white hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center dark:bg-gray-900 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            APPLE
          </button>
        </div>
        <div className="p-2 grid grid-cols-2 md:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <Link to="/detailproduct" key={index}>
              <img
                className="h-auto max-w-full rounded-lg transform transition-transform duration-300 hover:scale-105"
                src={`https://flowbite.s3.amazonaws.com/docs/gallery/square/image-${
                  index % 12
                }.jpg`}
                alt={`Product ${index + 1}`}
              />
            </Link>
          ))}
        </div>
        <Link to="/">
          <button className="container grid grid-cols-1 max-w-xl mx-auto mt-6 mb-2 rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300">
            Go Back Home
          </button>
        </Link>
      </div>
    </>
  );
}

export default CARDPRODUCT;
