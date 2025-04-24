"use client";

import Button from '@/components/button';
import Link from 'next/link';
import { useRouter } from "next/navigation";

const CompletePage = () => {
    const router = useRouter();
    return (
        <>
            <div className="flex flex-col items-center px-6 justify-center h-[32rem]">
                {/* Progress bar */}
                <div className="w-full lg:w-1/2 lg:flex-none">
                    <div className="flex justify-between mb-1">
                        <Link href={'/interested'} className='flex -mx-1'>
                            <svg className="w-6 h-6 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12l4-4m-4 4 4 4" />
                            </svg>
                            <span className="text-base font-medium text-gray-500 dark:text-white">
                                Back
                            </span>
                        </Link>
                        <span className="text-sm font-medium text-gray-500 dark:text-white">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-indigo-600 h-2.5 rounded-full w-[85%]"></div>
                    </div>
                </div>
                {/* Card */}
                <div className="mt-6 shadow-lg ring-2 ring-gray-900/5 sm:mx-0 rounded-3xl lg:w-1/2 lg:flex-none">
                    <div className="bg-white py-8 rounded-3xl px-8">
                        <div className="flex items-center justify-between">
                            <h3 className="xs:text-[1.3rem] text-[2rem] font-bold text-gray-900">
                                Thank you for completing profile
                            </h3>
                        </div>
                        <p className="mt-6 text-sm leading-6 text-gray-600">
                            Duis ac augue ut lectus congue luctus. Vivamus eu lacus vestibulum, luctus ante dignissim, interdum
                        </p>
                        <div className="flex justify-center">
                            <Button
                                onClick={() => router.push("/setup")}
                                text="Complete"
                                className="mt-5 py-3 rounded-3xl xs:w-1/2 sm:w-1/4 border-indigo-700 text-white bg-indigo-700 hover:bg-indigo-500 focus-visible:outline-indigo-700"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CompletePage;