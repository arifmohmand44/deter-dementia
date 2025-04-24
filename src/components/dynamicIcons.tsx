"use client"
import * as TbIcons from "react-icons/tb" // Tabler icons
import * as BiIcons from "react-icons/bi" // Bootstrap icons
import * as FaIcons from "react-icons/fa" // Font Awesome icons
import * as AiIcons from "react-icons/ai" // Ant Design icons
import * as IoIcons from "react-icons/io" // Ionicons
import * as MdIcons from "react-icons/md" // Material Design icons
import * as PiIcons from "react-icons/pi" // Phosphor Icons
import { useState, useEffect } from "react"

// Create a mapping of icon libraries by their prefix
const iconLibraries: any = {
    Tb: TbIcons,
    Bi: BiIcons,
    Fa: FaIcons,
    Ai: AiIcons,
    Io: IoIcons,
    Md: MdIcons,
    Pi: PiIcons, // Added Phosphor Icons
    // Add more icon libraries as needed
}

// Define the props for our MultiIcon component
interface MultiIconProps {
    icon: string // Format: "Tb:SmartHome" or "Pi:House"
    className?: string
    size?: number
    [key: string]: any // For any other props
}

export function DIcon({ icon, className, size = 24, ...props }: MultiIconProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // If no icon is provided, return null
    if (!icon) return null;

    // Split the icon string by the colon to get the prefix and name
    const [prefix, iconName] = icon.includes(":") ? icon.split(":") : [null, icon];

    // If no prefix is provided or it's not recognized, return null
    if (!prefix || !iconLibraries[prefix]) {
        console.warn(`Icon library "${prefix}" not found. Available libraries: ${Object.keys(iconLibraries).join(", ")}`);
        return null;
    }

    // Get the icon library based on the prefix
    const library = iconLibraries[prefix];

    // Get the full icon name (prefix + iconName)
    const fullIconName = `${prefix}${iconName}`;

    // Check if the icon exists in the library
    if (!library[fullIconName]) {
        console.warn(`Icon "${fullIconName}" not found in the ${prefix} library`);
        return null;
    }

    // Get the icon component from the library
    const IconComponent = library[fullIconName];

    // Render a placeholder div with same dimensions during SSR
    if (!mounted) {
        return <div style={{ width: size, height: size }} />;
    }

    // Render the icon with the provided props
    return <IconComponent className={className} size={size} {...props} />;
}

