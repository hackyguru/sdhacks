import React from "react";
import Navbar from "../components/Navbar";

export default function Create() {
  return (
    <div className="flex-column bg-gradient-to-r from-yellow-200 to-yellow-200 min-h-screen">
      <Navbar />

      <section class="">
        <div class="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
            <div class="lg:py-12 lg:col-span-2">
              <div class="mt-8">
                <h1
                  className="max-w-xl mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none"
                  style={{ fontFamily: "Poppins", lineHeight: "1.5" }}
                >
                  Create your community
                </h1>

                <address class="mt-2 not-italic">
                  Setup your community based on your preferences.
                </address>
              </div>
            </div>

            <div class="p-8 bg-white rounded-lg shadow-lg lg:p-12 lg:col-span-3">
              <form action="" class="space-y-4">
                <div>
                  <h2
                    style={{ fontFamily: "Poppins", lineHeight: "1.5" }}
                    className="mfont-sans text-lg font-bold tracking-tight text-gray-900 mb-4"
                  >
                    Community info
                  </h2>
                  <label class="sr-only" for="name">
                    Community name
                  </label>
                  <input
                    class="w-full p-3 text-sm border-gray-200 rounded-lg"
                    placeholder="Community name"
                    type="text"
                    id="name"
                  />
                </div>
                <h2
                  style={{ fontFamily: "Poppins", lineHeight: "1.5" }}
                  className="mfont-sans text-lg font-bold tracking-tight text-gray-900 mb-4 pt-4"
                >
                  Community coin info
                </h2>
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label class="sr-only" for="email">
                      Community coin name
                    </label>
                    <input
                      class="w-full p-3 text-sm border-gray-200 rounded-lg"
                      placeholder="Community coin name"
                      type="email"
                      id="email"
                    />
                  </div>

                  <div>
                    <label class="sr-only" for="phone">
                      Total coin supply
                    </label>
                    <input
                      class="w-full p-3 text-sm border-gray-200 rounded-lg"
                      placeholder="Total coin supply"
                      type="tel"
                      id="phone"
                    />
                  </div>
                </div>
                <h2
                  style={{ fontFamily: "Poppins", lineHeight: "1.5" }}
                  className="mfont-sans text-lg font-bold tracking-tight text-gray-900 mb-4 pt-4"
                >
                  Preferences
                </h2>
                <div class="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
                  <div className="hover:bg-black hover:text-yellow-100 rounded-lg">
                    <input
                      class="sr-only"
                      id="option1"
                      type="checkbox"
                      tabindex="-1"
                    />
                    <label
                      for="option1"
                      class="block w-full p-3 border border-gray-200 rounded-lg"
                      tabindex="0"
                    >
                      <span class="text-sm font-medium">
                        Mint total coins to creator
                      </span>
                    </label>
                  </div>

                  <div className="hover:bg-black hover:text-yellow-100 rounded-lg">
                    <input
                      class="sr-only"
                      id="option2"
                      type="checkbox"
                      tabindex="-1"
                    />
                    <input
                      class="sr-only"
                      id="option2"
                      type="checkbox"
                      tabindex="-1"
                    />
                    <label
                      for="option2"
                      class="block w-full p-3 border border-gray-200 rounded-lg"
                      tabindex="0"
                    >
                      <span class="text-sm font-medium">
                        Reward coins to new users
                      </span>
                    </label>
                  </div>
                </div>

                <div class="mt-4">
                  <a
                    href="/community/aaa"
                    class="inline-flex items-center justify-center w-full px-5 py-3 text-white bg-black rounded-lg sm:w-auto mt-4"
                  >
                    <span class="font-medium">Create community </span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-5 h-5 ml-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
