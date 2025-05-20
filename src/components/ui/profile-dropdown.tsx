"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { signOut } from "next-auth/react";

interface ProfileDropdownProps {
    session: any;
}

export const ProfileDropdown = ({ session }: ProfileDropdownProps) => {
    const userProfileDropdownLinks = [
        { label: "My Profile", link: "/", current: true },
        {
            label: "Account Settings",
            link: "/",
            current: false
        }
    ];

    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
        ) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isDropdownOpen]);

    return (
        <div className="relative group" ref={dropdownRef}>
            <button type="button" className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 focus:ring-offset-white" onClick={toggleDropdown}>
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Avatar</span>
                <Image
                    src={session?.user?.image ?? '/img/profile/avatar.jpg'}
                    alt="profile-user-icon"
                    className="rounded-full w-[2.6rem] h-[2.6rem]"
                    width={20}
                    height={20}
                    priority
                />
            </button>
            {isDropdownOpen && (
                <div className="overflow-hidden z-10 absolute top-10 w-[13rem] right-1 p-4 mt-1.5 bg-white rounded-md shadow-lg ring-1 ring-gray-600 ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                    <div className="flex gap-2 items-center">
                        <Image
                            src={session?.user?.image ?? '/img/profile/avatar.jpg'}
                            alt="profile-user-icon"
                            className="rounded-full w-[2.7rem] h-[2.7rem]"
                            width={20}
                            height={20}
                        />
                        <div className="flex flex-col max-w-[120px]">
                            <h3 className="font-semibold text-base text-gray-900/1 capitalize cursor-pointer" title={session?.user?.name ?? 'User'}>{session?.user?.name ?? 'User'}</h3>
                            <p className="text-xs text-gray-500 truncate cursor-pointer hover:text-indigo-500" title={session?.user?.email ?? 'user@example.com'}>{session?.user?.email ?? 'user@example.com'}</p>
                        </div>
                    </div>
                    <div className="h-[0.5px] my-3 opacity-[0.20] bg-gray-500"></div>
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        {userProfileDropdownLinks.map((menuItem, index) => (
                            <Link
                                key={index}
                                href={menuItem.link}
                                aria-current={menuItem.current ? 'page' : undefined}
                                className="block px-4 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 data-[focus]:bg-gray-100"
                            >
                                {menuItem.label}
                            </Link>
                        ))}

                        <Link
                            href="#"
                            onClick={() => signOut()}
                            className="block px-4 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 data-[focus]:bg-gray-100"
                        >
                            Logout
                        </Link>

                    </div>
                </div>
            )}
        </div>
    );
}
