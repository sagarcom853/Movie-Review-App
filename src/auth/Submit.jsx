import React from "react";
import { ImSpinner3 } from "react-icons/im";

const Submit = ({ value, busy }) => {
  return (
    <button
      type='submit'
      className='w-full h-8 bg-blue-700 p-1 mt-6 rounded hover:bg-opacity-70 hover:text-primary transition font-semibold'
    >
      {busy ? (
        <ImSpinner3 className='mx-auto animate-spin' />
      ) : (
        value
      )}
    </button>
  );
};

export default Submit;
