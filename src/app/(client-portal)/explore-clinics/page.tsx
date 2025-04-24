'use client';

import Image from "next/image";
import Button from '@/components/button';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import { ChevronDownIcon, Squares2X2Icon, Bars4Icon } from '@heroicons/react/20/solid'
import { useState } from 'react'

const sortOptions = [
  { name: 'Most Popular', href: '#', current: false },
  { name: 'Best Rating', href: '#', current: true },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]

const clinics = [
  {
    clinic: "Hearing and Dementia Care Clinic",
    address: "Whispering Pines, ON K2P 1L4",
    image: "/img/clinics/1.png"
  },
  {
    clinic: "Sound Minds Memory Care",
    address: "Maplewood, BC V5K 0A1",
    image: "/img/clinics/2.png"
  },
  {
    clinic: "Harmony Hearing Center",
    address: "Blossom Hill, QC H2X 3Y7",
    image: "/img/clinics/3.png"
  },
  {
    clinic: "Clear Sound Memory Clinic",
    address: "Silver Springs, AB T2E 3P9",
    image: "/img/clinics/4.png"
  },
  {
    clinic: "Whispering Hearing Center",
    address: "Blossom Hill, QC H2X 3Y7",
    image: "/img/clinics/5.png"
  },
  {
    clinic: "Echoes of Care Hearing Clinic",
    address: "Blossom Hill, QC H2X 3Y7",
    image: "/img/clinics/6.png"
  },
  {
    clinic: "Clear Sound Memory Clinic",
    address: "Silver Springs, AB T2E 3P9",
    image: "/img/clinics/7.png"
  },
  {
    clinic: "Hearing and Dementia Care Clinic",
    address: "Whispering Pines, ON K2P 1L4",
    image: "/img/clinics/1.png"
  }
]


function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function ExploreClinics() {
  const [filter, setFilter] = useState("");
  const [list, setList] = useState(true);
  return (
    <main className="mx-auto max-w-7xl py-4 sm:py-6">
      <div className="flex items-baseline justify-between">
        <h1 className="text-lg xs:text-sm font-bold tracking-tight text-gray-900">All Clinics</h1>

        <div className="flex items-center">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton className="group ring-1 ring-gray-300 bg-white px-3 py-1 rounded-md inline-flex justify-center text-sm font-medium text-gray-500 hover:text-gray-900">
                Sort by &nbsp;
                <span className="text-gray-900"> {filter ? filter : "All"}</span>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                />
              </MenuButton>
            </div>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="py-1">
                {sortOptions.map((option) => (
                  <MenuItem key={option.name}>
                    <a
                      href={option.href}
                      className={classNames(
                        option.current ? 'font-medium text-gray-900 bg-gray-100' : 'text-gray-500',
                        'block px-4 py-2 text-sm data-[focus]:bg-gray-100',
                      )}
                      onClick={(e: any) => setFilter(e.target.text)}
                    >
                      {option.name}
                    </a>
                  </MenuItem>
                ))}
              </div>
            </MenuItems>
          </Menu>
          <div className="group bg-gray-40 -m-2 ml-3 sm:ml-5 rounded-md inline-flex justify-center text-sm font-medium text-gray-500 hover:text-gray-900">
            <button type="button" className={`${!list ? "bg-gray-200 text-gray-500" : "text-gray-400"} px-2 py-1 rounded-bl-md rounded-tl-md hover:text-gray-500 hover:bg-gray-200`}
              onClick={() => setList(false)}>
              <span className="sr-only">View grid</span>
              <Squares2X2Icon aria-hidden="true" className="h-5 w-5" />
            </button>
            <button type="button" className={`${list ? "bg-gray-200 text-gray-500" : "text-gray-400"} px-2 py-1 rounded-br-md rounded-tr-md hover:text-gray-500 hover:bg-gray-200`}
              onClick={() => setList(true)}>
              <span className="sr-only">View list</span>
              <Bars4Icon aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <section aria-labelledby="products-heading" className="pt-6">
        {/* Clinics */}
        <div className={`grid grid-cols-1 gap-x-6 gap-y-4 ${list ? "sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 xl:gap-x-8" : "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"}`}>
          {/* Card */}
          {clinics.map((clinic, i) => (
            <div key={i} className={`${list ? 'flex flex-col items-center bg-gray-40 rounded-lg md:flex-row md:max-w-xl' : 'max-w-sm rounded-lg'}`}>
              <Image
                src={clinic.image}
                alt={clinic.clinic}
                className={list ? "object-cover w-full rounded-t-lg sm:h-96 md:h-auto sm:w-48 sm:rounded-none sm:rounded-s-lg" : "xs:w-full rounded-t-lg"}
                width={284}
                height={160}
                priority
              />
              <div className={`${list ? "flex flex-col justify-between px-6 leading-normal" : "py-4"}`}>
                <a href="#">
                  <h5 className="text-md font-bold tracking-tight text-gray-900 truncate dark:text-white">
                    {clinic.clinic}
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 truncate dark:text-gray-400">
                  {clinic.address}
                </p>
                <Button
                  text="Book Appointment"
                  className={`${list ? "w-[10rem]" : "w-full"} py-2 rounded-3xl font-normal border-indigo-700 text-indigo-700 hover:bg-indigo-500 hover:text-white`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <a href="#" className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
            </svg>

            <span>
              previous
            </span>
          </a>

          <div className="items-center hidden lg:flex gap-x-3">
            <a href="#" className="px-2 py-1 text-sm text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60">1</a>
            <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">2</a>
            <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">3</a>
            <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">...</a>
            <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">12</a>
            <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">13</a>
            <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">14</a>
          </div>

          <a href="#" className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
            <span>
              Next
            </span>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </a>
        </div>
      </section>
    </main>
  )
}