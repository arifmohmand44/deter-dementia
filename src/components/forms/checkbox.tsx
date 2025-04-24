import { CheckboxProps } from "@/types/form";
import React from "react";

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  name,
  onChange,
  label,
}) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        checked={checked}
        name={name}
        onChange={onChange}
        className="mr-2"
      />
      <label className="text-neutral-500 text-sm xs:text-base">{label}</label>
    </div>
  );
};
