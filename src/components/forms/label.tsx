import { LabelProps } from "@/types/form";
import React from "react";

export const Label: React.FC<LabelProps> = ({ title }) => {
  return (
    <label htmlFor={title.toLowerCase()} className="block text-sm font-medium leading-6 text-gray-600 dark:text-white">
      {title}
    </label>
  );
};
