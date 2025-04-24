import { ChangeEvent, KeyboardEvent } from "react";
export interface LabelProps {
  title: string;
}

export interface InputFieldProps {
  type: string;
  value?: string;
  name?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  min?: number;
  className?: string;
}

export interface Option {
  label: string;
  value: string;
}

export interface SelectDropdownProps {
  className?: string;
  value: string;
  onChange: (selectedValue: string) => void;
  options: Option[];
}

export interface TextareaProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  rows?: number;
  name?: string;
}

export interface CheckboxProps {
  checked: boolean;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
}
