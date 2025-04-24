"use client";

import Button from '@/components/button';
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const router = useRouter();
    return (
        <>
            <div className="flex flex-col items-center px-6 justify-center h-[32rem]">
                <div className="shadow-lg ring-2 ring-gray-900/5 sm:mx-0 rounded-3xl lg:w-1/2 lg:flex-none">
                    <div className="bg-white py-8 rounded-3xl px-8">
                        <div className="flex items-center justify-between">
                            <h3 className="xs:text-[1.3rem] text-[2rem] font-bold text-gray-900">
                                Before using please complete your profile
                            </h3>
                        </div>
                        <p className="mt-6 text-sm leading-6 text-gray-600">
                            Duis ac augue ut lectus congue luctus. Vivamus eu lacus vestibulum, luctus ante dignissim, interdum
                        </p>
                        <Button
                            onClick={() => router.push("/interested")}
                            text="Complete your profile"
                            className="mt-5 py-3 rounded-3xl sm:w-1/2 border-indigo-700 text-white bg-indigo-700 hover:bg-indigo-500 focus-visible:outline-indigo-700"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}