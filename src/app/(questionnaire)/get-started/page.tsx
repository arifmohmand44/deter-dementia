"use client";

import Button from "@/components/button";
import { useRouter } from "next/navigation";

export default function GetStarted() {
    const router = useRouter();
    return (
        <>
            <div className="flex flex-col items-center justify-center h-[32rem]">
                <div className="md:mx-auto md:w-full md:max-w-3xl">
                    <p className="mt-5 text-center text-sm leading-9 tracking-tight text-gray-900 sm:text-sm">
                        This should only take about 5 minutes and your answers are
                        <br />
                        completely confidential.
                    </p>
                </div>
                <div className="mt-10 w-full xs:w-1/2 sm:w-1/4 md:w-1/6 lg:w-1/6 mx-auto">
                    <Button
                        onClick={() => router.push("/questions")}
                        text="Lets get started"
                        className="rounded-3xl py-3 w-full border-indigo-700 text-white bg-indigo-700 hover:bg-indigo-500 focus-visible:outline-indigo-700"
                    />
                </div>
            </div>
        </>
    );
}