import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";

const navigation = [
  {
    name: "Github",
    href: "https://github.com/orgs/Certificates-Ninja",
    current: false,
  },
  { name: "Team", href: "#team", current: true },
  { name: "How to use", href: "#howtouse", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar2() {
  return (
    <Disclosure as="nav">
      {({ open }) => (
        <>
          <div className="px-10 py-3 mx-auto mb-10 sm:px-6 lg:px-8 bg-yellow-400">
            <div className="relative flex items-center justify-between h-20">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex ">
                <img
                  className="hidden lg:block h-14 w-auto"
                  src="/communitydao.png"
                  alt="Logo"
                />
                <div className="flex space-x-32 ml-60 justify-center">
                  <button>Dashboard</button>
                  <button>Chat</button>
                  <button>Profile</button>
                </div>
              </div>
              {/* <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className="flex flex-col items-center md:flex-row">
                  <a href="/import" class="relative mt-5">
                    <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-black rounded"></span>
                    <span
                      style={{ fontFamily: "Poppins" }}
                      class="relative inline-flex w-full h-full px-8 py-3 text-base font-bold bg-white border-2 border-black rounded hover:bg-yellow-400 xl:text-xl fold-bold"
                    >
                      0x..DDD
                      <div className="mt-2">
                        <svg
                          class="w-4 h-4 ml-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          ></path>
                        </svg>
                      </div>
                    </span>
                  </a>
                </div>
              </div> */}
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "text-black hover:bg-gray-700 hover:text-white"
                      : "text-black hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
