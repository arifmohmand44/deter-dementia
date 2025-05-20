"use client"
import Icon from "@/components/icon";
import { ProfileDropdown } from "@/components/ui/profile-dropdown";
import NavSearch from "@/components/nav-search";
import { useSession } from "next-auth/react";

interface HeaderProps {
    userName?: string;
}

export const Header = ({ userName = 'Dr. Raza' }: HeaderProps) => {
    const { data: session } = useSession();
    return (
        <header
            className="h-16 bg-white px-4 r flex items-center justify-between rounded-bl-xl shadow"
            role="banner"
            aria-label="Main header"
        >
            {/* Welcome Message */}
            <div className="text-lg xs:text-sm font-bold capitalize tracking-tight text-gray-900/1">
                Welcome {session?.user?.name ?? userName}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
                {/* Search Bar */}
                <NavSearch />

                {/* Notification Button */}
                <button
                    type="button"
                    className="relative rounded-full bg-gray-50 p-2 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    aria-label="View notifications"
                >
                    <span className="absolute -inset-1.5" />
                    <Icon name="Bell" />
                    <span
                        className="absolute -top-0 -right-0 h-4 w-4 bg-red-500 rounded-full text-[10px] font-medium text-white flex items-center justify-center"
                        role="status"
                        aria-label="3 unread notifications"
                    >
                        3
                    </span>
                </button>

                {/* Profile Dropdown */}
                <ProfileDropdown session={session} />
            </div>
        </header>
    );
}