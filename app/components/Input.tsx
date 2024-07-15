import React, { ChangeEvent } from "react";

interface InputProps {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  type?: string;
  label: string;
}

export default function Input({
  value,
  onChange,
  disabled,
  type = "text",
  label,
}: InputProps) {
  return (
    <div className=" ">
      <label className="block mb-2 text-sm font-medium text-gray-900 ">
        {label}
      </label>
      <input
        value={value}
        onChange={onChange}
        disabled={disabled}
        type={type}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
      />
    </div>
  );
}
