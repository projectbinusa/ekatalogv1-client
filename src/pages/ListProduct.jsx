import React from "react";

const ListProduk = () => {
  const cartItems = [
    {
      id: 1,
      name: "PC system All in One APPLE iMac (2023)",
      description:
        '24" Retina 4.5K, 8GB, SSD 256GB, 10-core GPU, Keyboard layout INT',
      price: 1499,
      quantity: 2,
      image: "imac.jpg",
    },
    {
      id: 2,
      name: "Restored Apple Watch Series 8 (GPS) 41mm",
      description: "Midnight Aluminum Case with Midnight Sport Band",
      price: 598,
      quantity: 1,
      image: "watch.jpg",
    },
    {
      id: 3,
      name: 'Apple - MacBook Pro 16" Laptop',
      description:
        "M3 Pro chip, 36GB Memory, 18-core GPU, 512GB SSD, Space Black",
      price: 1799,
      quantity: 1,
      image: "macbook.jpg",
    },
    {
      id: 4,
      name: 'Tablet APPLE iPad Pro 12.9" 6th Gen',
      description: "128GB, Wi-Fi, Gold",
      price: 699,
      quantity: 1,
      image: "ipad.jpg",
    },
  ];

  const orderSummary = {
    originalPrice: 7592,
    savings: 299,
    storePickup: 99,
    tax: 799,
    total: 8191,
  };

  return (
    <div className="max-w-7xl mx-auto p-8 bg-gray-50 shadow-lg rounded-lg">
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Shopping Cart</h2>
        <button className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
          Continue Shopping
        </button>
      </div>

      {cartItems.map((item) => (
        <div
          className="flex justify-between items-center border-b py-6"
          key={item.id}
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-24 h-auto rounded-lg shadow-sm"
          />
          <div className="flex-grow px-6">
            <h5 className="text-xl font-semibold text-gray-800">{item.name}</h5>
            <p className="text-gray-600">{item.description}</p>
            <button className="bg-red-500 text-white py-1 px-4 mt-2 rounded-lg shadow-md hover:bg-red-600 transition duration-300">
              Remove
            </button>
          </div>
          <div className="flex items-center">
            <input
              type="number"
              className="border p-2 w-16 text-center rounded-lg shadow-sm"
              value={item.quantity}
              min="1"
            />
          </div>
          <div className="text-lg font-bold text-gray-800">${item.price}</div>
        </div>
      ))}

      <div className="bg-white p-6 rounded-lg mt-6 shadow-md">
        <h4 className="text-2xl font-semibold border-b pb-2 mb-4 text-gray-800">
          Order Summary
        </h4>
        <p className="text-gray-700">
          Original Price: ${orderSummary.originalPrice}
        </p>
        <p className="text-gray-700">Savings: -${orderSummary.savings}</p>
        <p className="text-gray-700">
          Store Pickup: ${orderSummary.storePickup}
        </p>
        <p className="text-gray-700">Tax: ${orderSummary.tax}</p>
        <h4 className="text-2xl font-bold mt-4 text-gray-800">
          Total: ${orderSummary.total}
        </h4>
        <button className="bg-blue-600 text-white py-3 px-6 mt-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default ListProduk;
