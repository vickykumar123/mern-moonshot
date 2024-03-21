import React from "react";

interface InputProps {
  label: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

export default function Input({label, onChange}: InputProps) {
  return (
    <div className="mb-4">
      <label
        className="  text-[16px] font-[400] mb-2 flex flex-col"
        htmlFor={label}
      >
        {label}
      </label>
      <input
        className={`shadow appearance-none border-[1px] border-[#C1C1C1] rounded-[6px] w-[456px] py-2 px-3  leading-tight focus:outline-none focus:shadow-outline`}
        id={label}
        type={label}
        placeholder={label}
        onChange={onChange}
      />
    </div>
  );
}
