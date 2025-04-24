"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/button";

export default function EmailVerification() {
    const router = useRouter();
    const nextHandler = () => {
        router.push("/login");
    };

    return (
        <div className="flex flex-col items-center justify-center h-[32rem]">
            <div className="md:mx-auto md:w-full md:max-w-md">
                <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-indigo-700 sm:text-3xl">
                    Email Verification
                </h2>
                <p className="mt-2 text-center text-sm leading-9 tracking-tight text-gray-400 sm:text-sm">
                    Verify the email from inbox.
                </p>
            </div>
            <div className="mt-10 md:mx-auto md:w-full md:max-w-md">
                <Button
                    onClick={nextHandler}
                    text="Next"
                    className="rounded-3xl py-3 w-full border-indigo-700 text-white bg-indigo-700 hover:bg-indigo-500 focus-visible:outline-indigo-700"
                />
            </div>
        </div>
    )
}