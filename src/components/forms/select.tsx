import { SelectDropdownProps } from "@/types/form";
import React from "react";

export const Select: React.FC<SelectDropdownProps> = ({
    className,
    options,
    value,
    onChange,
}) => {
    return (
        <select
            className={`w-full font-medium ${className}`}
            onChange={(e) => onChange(e.target.value)}
            value={value}
        >
            <option value="" disabled>Select an option</option>
            {options?.map((option) => (
                <option key={String(option.label)} value={String(option.value)}>{String(option.label)}</option>
            ))}
        </select>
    );
};
