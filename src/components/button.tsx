import { ButtonProps } from "@/types/button";
import Icon from "@/components/icon";
import React from "react";

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  disabled = false,
  className,
  icon,
  type = "button"
}) => {
  return (
    <button
      type={type}
      className={` 
     ${icon ? "items-center flex " : ""
        } ${className} mmd-btn flex justify-center border-2 px-3 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && (
        <span className="mr-2">
          <Icon name={icon} />
        </span>
      )}
      {text}
    </button>
  );
};

export default Button;
