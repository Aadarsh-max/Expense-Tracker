import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, placeholder, label, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <div className="w-full">
      <label
        className="block mb-1 text-sm font-semibold text-gray-700 select-none"
        htmlFor={label}
      >
        {label}
      </label>

      <div
        className="flex items-center border border-gray-300 rounded-md px-3 py-2
          bg-white shadow-sm
          focus-within:ring-2 focus-within:ring-blue-500
          hover:border-blue-400 transition-colors duration-200"
      >
        <input
          id={label}
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          className="flex-grow bg-transparent outline-none text-gray-900 placeholder-gray-400
            font-medium text-base"
          value={value}
          onChange={onChange}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={toggleShowPassword}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="ml-2 text-gray-500 hover:text-blue-600 transition-colors duration-200"
          >
            {showPassword ? <FaRegEye size={20} /> : <FaRegEyeSlash size={20} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
