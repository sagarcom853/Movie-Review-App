import React from "react";

const FormInput = ({
  label,
  name,
  placeholder,
  isPassVisible,
  handlePasswordView,
  ...rest
}) => {
  return (
    <div>
      <div>
        <label
          htmlFor={name}
          className='text-sm mb-1 transition-all duration-300'
        >
          {label}
        </label>
        <input
          id={name}
          name={name}
          className='my-1 text-sm focus:border-gray-700 p-1 text-black w-full transition-all border-white rounded'
          placeholder={placeholder}
          {...rest}
        />
      </div>
    </div>
  );
};

export default FormInput;
