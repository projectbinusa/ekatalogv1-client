import React from "react";
import asus from "./../assets/logo/1.png";
// import { Link } from "react-router-dom";

function PC() {
  return (
    <>
{/* Cardlist */}
<div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <a key={product.id} href={product.href} className="group">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
            </a>
          ))}
        </div>
      </div>
    </div>

{/* End Cardlist */}


    {/* Card List */}
      <div className="mt-2 block mx-auto w-full sm:w-[800px]">
        <a
          className="w-[250px] group flex items-center justify-between gap-4 rounded-lg border border-indigo-600 bg-indigo-600 px-5 py-3 my-2 transition-colors hover:bg-transparent focus:outline-none focus:ring"
          href="#"
        >
          <span className="shrink-0 w-full sm:w-[100px] bg-white text-indigo-600 group-active:text-indigo-500">
            <img
              src="https://w7.pngwing.com/pngs/639/845/png-transparent-asus-flat-brand-logo-icon.png"
              alt="asus"
              className="w-10 h-10 block mx-auto"
            />
          </span>

          <span className="font-medium text-white transition-colors group-hover:text-indigo-600 group-active:text-indigo-500">
            ASUS
          </span>
        </a>
      </div>

      {/* Infinity Logo */}
      <div className="relative font-inter antialiased">
        <main className="relative min-h-screen flex flex-col justify-center bg-slate-900 overflow-hidden">
          <div className="w-full max-w-5xl mx-auto px-4 md:px-6 py-24">
            <div className="text-center">
              {/* Logo Carousel animation  */}
              <div
                x-data="{}"
                x-init="$nextTick(() => {
              let ul = $refs.logos;
              ul.insertAdjacentHTML('afterend', ul.outerHTML);
              ul.nextSibling.setAttribute('aria-hidden', 'true');
          })"
                className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]"
              >
                <ul
                  x-ref="logos"
                  className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll"
                >
                  <li>
                    <img
                      src="https://cruip-tutorials.vercel.app/logo-carousel/facebook.svg"
                      alt="Facebook"
                    />
                  </li>
                  <li>
                    <img
                      src="https://cruip-tutorials.vercel.app/logo-carousel/disney.svg"
                      alt="Disney"
                    />
                  </li>
                  <li>
                    <img
                      src="https://cruip-tutorials.vercel.app/logo-carousel/airbnb.svg"
                      alt="Airbnb"
                    />
                  </li>
                  <li>
                    <img
                      src="https://cruip-tutorials.vercel.app/logo-carousel/apple.svg"
                      alt="Apple"
                    />
                  </li>
                  <li>
                    <img
                      src="https://cruip-tutorials.vercel.app/logo-carousel/spark.svg"
                      alt="Spark"
                    />
                  </li>
                  <li>
                    <img
                      src="https://cruip-tutorials.vercel.app/logo-carousel/samsung.svg"
                      alt="Samsung"
                    />
                  </li>
                  <li>
                    <img
                      src="https://cruip-tutorials.vercel.app/logo-carousel/quora.svg"
                      alt="Quora"
                    />
                  </li>
                  <li>
                    <img
                      src="https://cruip-tutorials.vercel.app/logo-carousel/sass.svg"
                      alt="Sass"
                    />
                  </li>
                </ul>
              </div>
              {/* End: Logo Carousel animation  */}
            </div>
          </div>
        </main>
      </div>

      {/* End Infinity Logo */}
    </>
  );
}

export default PC;
