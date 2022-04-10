import React from "react";
import Tilt from "react-parallax-tilt";
import TextLoop from "react-text-loop";

export default function Hero() {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-0 lg:py-20">
      <div className="flex flex-col items-center justify-between lg:flex-row">
        <div className="mb-10 lg:max-w-xl lg:pr-5 lg:mb-0">
          <div className="max-w-xl mb-6">
            <h1
              className="max-w-xl mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none"
              style={{ fontFamily: "Poppins", lineHeight: "1.5" }}
            >
              Launch your decentralized community in minutes
            </h1>
            <p className="text-base text-gray-700 md:text-lg">
              The future is decentralized. With Communifty - you can easily
              setup a DAO (Decentralized Autonomous Organization) for your
              community with it's own coin and membership NFT!
            </p>
          </div>
          <div className="flex flex-col items-center md:flex-row space-x-6">
            <a href="/create" class="relative mt-5">
              <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-black rounded"></span>
              <span
                style={{ fontFamily: "Poppins" }}
                class="relative inline-block w-full h-full px-8 py-3 text-base font-bold bg-white border-2 border-black rounded hover:bg-yellow-400 xl:text-xl fold-bold"
              >
                Create community
              </span>
            </a>
            <a href="/community/aaa" class="relative mt-5">
              <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-black rounded"></span>
              <span
                style={{ fontFamily: "Poppins" }}
                class="relative inline-block w-full h-full px-8 py-3 text-base font-bold bg-white border-2 border-black rounded hover:bg-yellow-400 xl:text-xl fold-bold"
              >
                Enter community
              </span>
            </a>
          </div>
          <br />
          <br />

          <img
            className="h-28"
            src="https://www.sdhacks.io/static/media/hero-logo.d15443e6dab7cf67a60adbd2796e5a7a.svg"
          />
        </div>
        <div className="relative lg:w-1/2 pl-20 ">
          <Tilt>
            <img
              className="object-cover w-full h-56 rounded shadow-lg sm:h-96 border-2 border-black"
              src="https://brightongirls.gdst.net/wp-content/uploads/2021/05/istockphoto-1202344480-612x612-1.jpg"
              alt=""
            />
          </Tilt>
        </div>
      </div>
    </div>
  );
}
