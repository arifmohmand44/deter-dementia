"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/utils/cn-utils";
import Favicon from "@/components/logos/favicon";
import { DIcon } from "@/components/dynamicIcons";

export default function SideBar() {
    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    const [open, setOpen] = useState(true);
    const [subMenuOpen, setSubMenuOpen] = useState(false);
    const pathname = usePathname();

    const navigation = [
        {
            label: "Long Term Risk Prediction Tool",
            icon: "Tb:SmartHome",
            link: "/d-summary"
        },
        {
            label: "DD Courses",
            icon: "Pi:MonitorPlayBold",
            link: "/explore-clinics",
        },
        {
            label: "Genetic Testing",
            icon: "Pi:DnaBold",
            link: "#",
        },
        // {
        //     label: "Age Appropriate Cognitive testing",
        //     icon: "AgeAppropriate",
        //     link: "#",
        // },
        // {
        //     label: "Local Resources",
        //     icon: "ResourceLibrary",
        //     link: "#",
        //     submenu: true,
        //     subMenuItems: [
        //         {
        //             label: "Hearing",
        //             link: "#"
        //         },
        //         {
        //             label: "Sleep Clinic",
        //             link: "#"
        //         },
        //         {
        //             label: "Smoking Cessation",
        //             link: "#"
        //         }, {
        //             label: "Weight Management",
        //             link: "#"
        //         },
        //         {
        //             label: "Oral Health",
        //             link: "#"
        //         }, {
        //             label: "Nutrition",
        //             link: "#"
        //         }, {
        //             label: "Exercise",
        //             link: "#"
        //         }
        //     ]
        // },
        // {
        //     label: "Management",
        //     icon: "ResourceLibrary",
        //     link: "#",
        //     submenu: true,
        //     subMenuItems: [
        //         {
        //             label: "OT Home Safety",
        //             link: "#"
        //         },
        //         {
        //             label: "PSW Supports",
        //             link: "#"
        //         },
        //         {
        //             label: "Caregiver Support",
        //             link: "#"
        //         },
        //         {
        //             label: "Retirement Homes",
        //             link: "#"
        //         },
        //         {
        //             label: "Respite Care",
        //             link: "#"
        //         },
        //         {
        //             label: "Healthcare Supplies",
        //             link: "#"
        //         },
        //     ]
        // },
    ];

    const userMenu = [
        {
            label: "Profile",
            icon: "Pi:UserCircleGear",
            link: "/profile"
        },
        {
            label: "Log out",
            icon: "Tb:Logout",
            link: "/login"
        },
    ];

    return (
        <div
            className={cn(
                "transition-all duration-300 bg-white flex flex-col shadow",
                collapsed ? "w-16" : "w-64",
            )}
        >
            {/* Header */}
            <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-md bg-blue-600 flex items-center justify-center text-white font-bold">
                        <Favicon />
                    </div>
                    {!collapsed && (
                        <div>
                            <div>Deter</div>
                            <div className="-mt-1 text-xl text-indigo-600 font-bold">Dementia</div>
                        </div>
                    )}
                </div>
                <button className="text-gray-400 hover:text-slate-600" onClick={toggleSidebar}>
                    {collapsed ? <DIcon icon="Pi:ArrowSquareRightBold" size={18} className="text-gray-300" /> : <DIcon icon="Pi:ArrowSquareLeftBold" size={18} className="text-gray-300" />}
                </button>
            </div>

            {/* Main Menu */}
            <div className="flex-1">
                <div className={cn("px-4 py-2 text-xs text-gray-900 tracking-widest", collapsed && "text-center")}>
                    {collapsed ? "MENU" : "MAIN MENU"}
                </div>
                <nav className="space-y-2 px-2">
                    {navigation.map((menu, i) => {
                        const isActive = pathname.startsWith(menu.link);
                        return (
                            <Link
                                key={i}
                                href={menu.link}
                                className={cn(
                                    "flex items-center gap-3 px-2 py-2 rounded-md",
                                    collapsed ? "justify-center" : "",
                                    isActive ? "active bg-gray-50 text-indigo-700" : "text-gray-500",
                                    "hover:bg-gray-50 hover:text-indigo-700",
                                )}
                            >
                                <DIcon icon={menu.icon} size={24} />
                                {!collapsed && <span className="text-md font-medium w-40 truncate" title={menu.label}>{menu.label}</span>}
                                {/* {menu.submenu && subMenuOpen && open && (
                                        <ul className="ring-1 py-2 m-4">
                                            {menu.subMenuItems.map((submenuItem, i) => (
                                                <li key={i} className={`hover:bg-indigo-700 hover:text-white rounded-3xl cursor-pointer sm:justify-start xs:px-0 px-4 h-12 flex items-center justify-center transition-colors`}
                                                >
                                                    {submenuItem.label}
                                                </li>
                                            ))}
                                        </ul>
                                    )} */}
                            </Link>
                        )
                    })}
                </nav>
            </div>

            {/* Admin Section */}
            <div className="mt-auto">
                <div className={cn("px-4 py-2 text-xs text-gray-900 tracking-widest", collapsed && "text-center")}>ADMIN</div>
                <nav className="space-y-1 px-2 pb-4">
                    {userMenu.map((menu, i) => (
                        <Link key={i} href={"/profile"} className={cn(
                            "flex items-center gap-3 px-2 py-2 rounded-md hover:bg-gray-50",
                            collapsed ? "justify-center" : "",
                            "text-gray-500 hover:text-indigo-700",
                        )}
                        >
                            <DIcon icon={menu.icon} size={24} />
                            {!collapsed && <span className="text-md font-medium w-40 truncate">{menu.label}</span>}
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
    )

    // return (
    // <div className={`flex flex-col h-[calc(100vh-78.6px)] xs:px-4 px-5 py-4 overflow-y-auto drop-shadow-1xl drop-shadow-lg border-indigo-600 border-r rtl:border-r-0 rtl:border-l bg-white sm:w-16 lg:${open ? "w-60" : "w-14"} w-14 pt-4 transition-all rounded-tl-3xl duration-300 relative z-10`}>
    //     <ArrowLongLeftIcon className={`bg-white h-5 w-5 z-20 text-gray-900 text-3xl rounded-full absolute right-0 top-7 border border-gray-900 cursor-pointer
    //     ${!open && "rotate-180"}`}
    //         onClick={() => setOpen(!open)} />
    //     <ul className="flex-1 -mx-3 space-y-3 mmd-nav">
    //         {navigation.map((menu, i) => {
    //             const isActive = pathname.startsWith(menu.link);
    //             return (
    //                 <Link
    //                     key={i}
    //                     href={menu.link}
    //                 >
    //                     <li key={i} className={`${isActive ? "active bg-indigo-700 text-white" : ""
    //                         } relative hover:bg-indigo-700 hover:text-white rounded-3xl cursor-pointer sm:justify-start xs:px-0 px-4 h-12 flex items-center justify-center transition-colors`}
    //                     >
    //                         <span className={`${!open && "-ml-1"}`}>
    //                             <Icon name={menu.icon} />
    //                         </span>
    //                         <span className={`ml-3 hidden lg:${(!open) ? "hidden" : "block"} font-semibold tracking-wide transition-colors flex-1 duration-200`}>
    //                             {menu.label}
    //                         </span>
    //                         {menu.submenu && open && (
    //                             <ChevronDownIcon className={`${subMenuOpen && "rotate-180"} h-5 w-5`} onClick={() => setSubMenuOpen(!subMenuOpen)} />
    //                         )}
    //                     </li>
    //                     {menu.submenu && subMenuOpen && open && (
    //                         <ul className="ring-1 py-2 m-4">
    //                             {menu.subMenuItems.map((submenuItem, i) => (
    //                                 <li key={i} className={`hover:bg-indigo-700 hover:text-white rounded-3xl cursor-pointer sm:justify-start xs:px-0 px-4 h-12 flex items-center justify-center transition-colors`}
    //                                 >
    //                                     {submenuItem.label}
    //                                 </li>
    //                             ))}
    //                         </ul>
    //                     )}
    //                 </Link>
    //             )
    //         })}
    //     </ul>
    //     <div className="flex flex-col">
    //         <ul className="flex-1 -mx-3 space-y-3 mmd-nav">
    //             {userMenu.map((menu, i) => (
    //                 <Link key={i} href={"/profile"} >
    //                     <li className="hover:bg-indigo-700 hover:text-white rounded-3xl cursor-pointer sm:justify-start xs:px-0 px-4 h-12 flex items-center justify-center transition-colors">
    //                         <span className={`${!open && "-ml-1"}`}>
    //                             <Icon name={menu.icon} />
    //                         </span>
    //                         <span className={`ml-3 hidden lg:${(!open) ? "hidden" : "block"} font-semibold tracking-wide transition-colors`}> {menu.label}</span>
    //                     </li>
    //                 </Link>
    //             ))}
    //         </ul>
    //     </div>
    // </div >
    // )
}
