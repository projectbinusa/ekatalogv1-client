import React, { useState, useEffect } from "react";
import axios from "axios";
import SidebarAdmin from "../../components/Sidebar";

const ListByPc = () => {
    const [produk, setProduk] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
    
        if (token) {
          axios.get("http://localhost:7000/api/list_produk/kualitas_standar/PC", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(responseStandar => {
            const produkStandar = responseStandar.data;
            axios.get("http://localhost:7000/api/list_produk/kualitas_tinggi/PC", {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
            .then(responseTinggi => {
              const produkTinggi = responseTinggi.data;
              
              // Gabungkan kedua produk ke dalam satu array
              setProduk([...produkStandar, ...produkTinggi]);
            })
            .catch(error => {
              console.error("Ada masalah saat mengambil data produk kualitas tinggi:", error);
            });
          })
          .catch(error => {
            console.error("Ada masalah saat mengambil data produk kualitas standar:", error);
          });
        } else {
          console.error("Token tidak ditemukan. Pastikan Anda sudah login.");
        }
    }, []);

    return (
        <div className="min-h-screen flex flex-col sm:flex-row">
          <SidebarAdmin />
          <section className="text-gray-800 body-font flex-1 mt-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              {/* Menampilkan semua produk */}
              <div className="flex flex-wrap justify-start">
                {produk.map(item => (
                  <div key={item.id} className="mb-6 px-3 w-full sm:w-1/2 md:w-1/4 lg:w-1/5">
                    <div className="shadow-lg rounded-lg overflow-hidden bg-white">
                      <div className="relative h-48 w-full">
                        <img 
                          src={item.foto} 
                          alt={item.namaProduk} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 bg-gradient-to-r from-cyan-700 to-cyan-500 text-center">
                        <h2 className="text-xl font-medium text-white">
                          {item.namaProduk}
                        </h2>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
    );
};

export default ListByPc;