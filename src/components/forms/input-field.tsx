import { InputFieldProps } from "@/types/form";
import React, { useState } from "react";
import Icon from "@/components/icon";


export const InputField: React.FC<InputFieldProps> = ({
    placeholder,
    type,
    name,
    value,
    onChange,
    onKeyDown,
    className
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <div className="relative">
            <input
                type={showPassword ? "text" : type}
                value={value}
                name={name}
                id={name?.toLowerCase()}
                onChange={onChange}
                onKeyDown={onKeyDown}
                placeholder={placeholder}
                autoComplete={name?.toLowerCase()}
                required={true}
                className={`border-gray-300 text-sm border-2 rounded-3xl p-3 focus:outline-none focus:border-indigo-500 w-full sm:text-sm sm:leading-6 text-gray-900/1 ${className ?? ''}`}
            />
            {type === "password" && (
                <button
                    type="button"
                    className="absolute top-1/2 transform -translate-y-1/2 right-3 cursor-pointer"
                    onClick={togglePasswordVisibility}
                >
                    {showPassword ? (
                        <Icon name="Eye" />
                    ) : (
                        <Icon name="EyeSlash" />
                    )}
                </button>
            )}
        </div>
    );
};
