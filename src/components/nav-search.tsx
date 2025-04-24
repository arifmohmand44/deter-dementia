"use client";
import Icon from "@/components/icon";
import { ChangeEvent, FormEvent, useState } from "react";

export type SearchFormData = {
    search: string;
};

export default function NavSearch() {

    const [formData, setFormData] = useState<SearchFormData>({
        search: "",
    });

    const [formErrors, setFormErrors] = useState({
        search: "",
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
        <form action="#" method="POST" className="space-y-4 md:space-y-6 xs:hidden sm:block" onSubmit={(e) => submitHandler(e)}>
            <div className="relative">
                <button
                    type="button"
                    className="absolute top-1/2 transform -translate-y-1/2 left-3 cursor-pointer"
                >
                    <Icon name="Search" />
                </button>
                <input
                    type="search"
                    name="search"
                    onChange={handleInputChange}
                    placeholder="Search"
                    required={true}
                    className="pl-12 border-stone-300 text-md text-gray-800 border-0 bg-gray-50 rounded-3xl p-2 placeholder:text-gray-500 focus:outline-none focus:border-indigo-600 w-full sm:text-md sm:leading-6"
                />
            </div>
        </form>
    )
}