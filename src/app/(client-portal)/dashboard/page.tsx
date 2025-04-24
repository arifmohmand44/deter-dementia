"use client";

import Button from '@/components/button';
import Link from 'next/link';
import Image from "next/image";
import { format } from 'date-fns';

// import { Metadata } from 'next';
// export const metadata: Metadata = {
//     title: 'Dashboard',
//     description: 'This is developed by Arif Mohmand.'
// }

const Course = [
    {
        title: "Mild Cognitive Impairment",
        description: "Learn about early cognitive changes, risk factors, and practical strategies",
        link: ""
    },
    {
        title: "Mild Cognitive Impairment",
        description: "Learn about early cognitive changes, risk factors, and practical strategies",
        link: ""
    },
    {
        title: "Mild Cognitive Impairment",
        description: "Learn about early cognitive changes, risk factors, and practical strategies",
        link: ""
    },
    {
        title: "Mild Cognitive Impairment",
        description: "Learn about early cognitive changes, risk factors, and practical strategies",
        link: ""
    },
    {
        title: "Mild Cognitive Impairment",
        description: "Learn about early cognitive changes, risk factors, and practical strategies",
        link: ""
    }
]

const Appointments = [
    {
        clinic: "Hearing and Dementia Care Clinic",
        status: "Appointment On",
        date: "2024-07-14",
        time: "10:30"
    },
    {
        clinic: "Sound Minds Memory Care",
        status: "Appointment On",
        date: "2024-07-14",
        time: "10:30"
    },
    {
        clinic: "Harmony Hearing Center",
        status: "Appointment On",
        date: "2024-07-14",
        time: "10:30"
    },
    {
        clinic: "Clear Sound Memory Clinic",
        status: "Appointment On",
        date: "2024-07-14",
        time: "10:30"
    }
]

const filter = [
    "All", "Edmonton", "Winnipeg", "Québec City", "Ottawa", "Calgary"
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
    }
]

export default function Dashboard() {

    return (
        <main className="mx-auto max-w-7xl py-4 sm:py-6">
            <div className="mx-auto grid max-w-7xl gap-x-4 gap-y-20 xl:grid-cols-3">
                <div className="grid gap-x-2 gap-y-6 sm:grid-cols-2 sm:gap-y-4 xl:col-span-2">
                    {/* Most Favourites Clinic */}
                    <div className="bg-white col-span-1 xs:col-span-1 md:col-span-2 p-3 shadow-lg ring-1 ring-gray-900/10 rounded-xl lg:flex-none">
                        <div className="flex flex-wrap justify-between">
                            <h1 className="lg:w-[50%] md:w-[30%] text-md xs:text-sm font-bold tracking-tight text-gray-900">Most Favourites Clinics</h1>
                            {filter.map((item, i) => (
                                <Link key={i} href={"#"} className={`${i === 0 ? "text-indigo-500 underline decoration-[1.5px] underline-offset-2" : ""} xs:hidden py-1 font-semibold text-sm hover:text-indigo-500 hover:underline hover:decoration-[1.5px] hover:underline-offset-2`}>{item}</Link>
                            ))}
                        </div>
                        <div className="grid gap-x-4 mt-4 gap-y-12 sm:grid-cols-2 sm:gap-y-5 xl:col-span-2">
                            {clinics.map((clinic, i) => (
                                <div key={i} className="sm:flex items-center gap-x-6">
                                    <Image
                                        src={clinic.image}
                                        alt={clinic.clinic}
                                        className="xs:h-40 xs:w-full h-18 w-28 rounded-lg"
                                        width={135}
                                        height={83.18}
                                        priority
                                    />
                                    <div>
                                        <h3 className="text-[0.9rem] font-semibold leading-6 tracking-tight text-gray-900">{clinic.clinic}</h3>
                                        <p className="text-xs font-semibold leading-6 text-gray-600">{clinic.address}</p>
                                        <Button
                                            text="Book Appointment"
                                            className="py-0 rounded-3xl text-xs px-2 font-normal border-indigo-700 text-indigo-700 hover:bg-indigo-500 hover:text-white"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-3 flex justify-center">
                            <Link href={'more'} className="text-md font-semibold leading-6 text-indigo-700 hover:text-indigo-500">View more</Link>
                        </div>
                    </div>

                    {/* Appointments */}
                    <div className="bg-white col-span-1 xs:col-span-1 md:col-span-2 p-3 shadow-lg ring-1 ring-gray-900/10 rounded-xl lg:flex-none">
                        <h1 className="text-md xs:text-sm font-bold tracking-tight text-gray-900">My Appointments</h1>
                        <ul className="mt-4 mb-3">
                            {Appointments.map((appointment, i) => (
                                <li key={i} className="sm:flex sm:flex-wrap justify-between items-center w-full p-1 px-2 mb-3 items-center ring-1 ring-gray-900/10 rounded-lg">
                                    <div className="sm:w-[50%] sm:border-r sm:rtl:border-r-0 sm:rtl:border-l">
                                        {i + 1}. {appointment.clinic}
                                    </div>
                                    <div className="sm:pr-5 sm:border-r sm:rtl:border-r-0 sm:rtl:border-l">{appointment.status}</div>
                                    <div className="sm:pr-5 sm:border-r sm:rtl:border-r-0 sm:rtl:border-l">
                                        {format(new Date(appointment.date), 'dd-MM-yyyy')}
                                    </div>
                                    <div>{format(new Date(`${appointment.date}T${appointment.time}`), 'hh:mm a')}</div>
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-center">
                            <Link href={'more'} className="text-md font-semibold leading-6 text-indigo-700 hover:text-indigo-500">View more</Link>
                        </div>
                    </div>
                </div>

                {/* Course */}
                <div className="lg:max-w-2xl bg-white p-3 shadow-lg ring-1 ring-gray-900/10 rounded-xl">
                    <h1 className="text-md xs:text-sm font-bold tracking-tight text-gray-900">Courses</h1>

                    <ul className="mt-4 mb-5 divide-y divide-gray-200 dark:divide-gray-700">
                        {Course.map((course, i) => (
                            <li key={i} className="py-2">
                                <div className="sm:flex items-center space-x-4 rtl:space-x-reverse">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            {course.title}
                                        </p>
                                        <p className="text-sm text-gray-500 sm:truncate dark:text-gray-400">
                                            {course.description}
                                        </p>
                                        <Link href={'/free'} className="text-sm font-semibold leading-6 text-indigo-700 hover:text-indigo-500">Free</Link>
                                    </div>
                                    <div className="sm:inline-flex items-center xs:mt-2">
                                        <Button
                                            icon="Play"
                                            text="Preview course"
                                            className="py-2 rounded-3xl w-full font-normal border-indigo-700 text-indigo-700 hover:bg-indigo-500 hover:text-white"
                                        />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-center">
                        <Link href={'more'} className="text-md font-semibold leading-6 text-indigo-700 hover:text-indigo-500">View more</Link>
                    </div>
                </div>
            </div>
        </main>
    );
}