"use client";
import { InputField } from "@/components/forms/input-field";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/button";

export type ForgotPasswordFormData = {
    email: string;
};

export default function ForgotPassword() {

    const router = useRouter();
    const nextHandler = () => {
        router.push("/email-verification");
    };

    const [formData, setFormData] = useState<ForgotPasswordFormData>({
        email: "",
    });

    const [formErrors, setFormErrors] = useState({
        email: "",
    });

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target;

        // Always update the state, even if it's an auto-filled password field or an empty string
        const newValue =
            type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

        setFormData((prevData) => ({
            ...prevData,
            [name]: newValue,
        }));

        // Clear the corresponding error when the user starts typing
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
    };

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    };
    return (
        <div className="flex flex-col items-center justify-center h-[32rem]">
            <div className="md:mx-auto md:w-full md:max-w-md">
                <h2 className="text-center text-2xl leading-9 tracking-tight text-indigo-700 sm:text-3xl">
                    Forgot Password
                </h2>
                <p className="text-center text-sm leading-9 tracking-tight text-gray-400 sm:text-sm">Please enter your email address</p>
            </div>
            <div className="mt-4 w-full max-w-md">
                <form action="#" method="POST" className="space-y-4 md:space-y-6" onSubmit={(e) => submitHandler(e)}>
                    <div>
                        <div className="mt-2">
                            <InputField
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                onChange={handleInputChange}
                                value={formData.email}
                            />
                            {formErrors.email && (
                                <span className="text-red-500 text-sm">{formErrors.email}</span>
                            )}
                        </div>
                    </div>
                    <div>
                        <Button
                            onClick={nextHandler}
                            text="Submit"
                            className="rounded-3xl py-3 w-full border-indigo-700 text-white bg-indigo-700 hover:bg-indigo-500 focus-visible:outline-indigo-700"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}