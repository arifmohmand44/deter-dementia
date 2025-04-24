"use client";

import Button from "@/components/button";
import { useRouter } from "next/navigation";

export default function Disclaimer() {
    const router = useRouter();
    return (
        <>
            <div className="flex flex-col md:items-center md:justify-center md:h-[32rem] p-6 md:p-0">
                <div className="md:mx-auto md:w-full md:max-w-3xl">
                    <h2 className="text-center text-2xl leading-9 tracking-tight text-indigo-700 sm:text-3xl">
                        MEDICAL DISCLAIMER
                    </h2>
                    <p className="mt-5 md:text-center text-sm leading-9 tracking-tight text-gray-900 sm:text-sm">
                        This assessment is the result of years of practice experience and clinical research. The results, by necessity, are of a general nature and should not be viewed as a substitute for an evaluation or treatment by a competent medical specialist. Self-report assessments have advantages and limitations. This assessment is intended as an information and education tool for you and your loved ones, and is not designed to replace your health care provider’s professional judgment regarding your health. Always discuss any recommendations with your personal physician. The assessment is not intended to diagnose, treat, or cure any medical condition. Please work with your health care provider for advice about your specific medical condition(s) and treatment(s) for such condition(s).
                    </p>
                </div>
                <div className="mt-10 md:mx-auto md:w-full md:max-w-xl gap-8 flex flex-col-1">
                    <Button
                        onClick={() => router.push("/questions")}
                        text="I consent"
                        className="rounded-3xl py-3 w-full border-indigo-700 text-white bg-indigo-700 hover:bg-indigo-500 focus-visible:outline-indigo-700"
                    />
                    <Button
                        text="I Don’t consent"
                        className="rounded-3xl py-3 w-full border-indigo-700 text-indigo-700 hover:bg-indigo-500 hover:text-white"
                    />
                </div>
            </div>
        </>
    );
}