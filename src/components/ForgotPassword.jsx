import React, { useState } from "react";
import Title from "../auth/Title";
import FormInput from "../auth/FormInput";
import Submit from "../auth/Submit";
import { useNotification } from "../Hooks";
import { forgetPassword } from "../API/Auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { updateNotification } = useNotification();

  const validateUser = (email) => {
    let isValidEmail = /^[\w\-.]+@([\w-]+\.)+[\w-]{2,}$/;
    if (!email) {
      return { ok: false, error: "Email cannot be empty" };
    }
    if (!isValidEmail.test(email)) {
      return { ok: false, error: "Please enter correct email" };
    }
    return { ok: true };
  };

  const handleformSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateUser(email);
    if (!ok) {
      return updateNotification("error", error);
    }
    const { error: err, message } = await forgetPassword(email);
    if (err) {
      return updateNotification("error", err);
    }
    updateNotification("success", message);
  };


  const handleChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  return (
    <div className='bg-gray-700 w-72 mx-auto my-auto h-64 fixed items-center text-white inset-0 justify-center'>
      <form className='p-6' onSubmit={handleformSubmit}>
        <Title value='Please Enter your EmailId' />
        <FormInput
          name='email'
          label='Email'
          required
          value={email}
          onChange={handleChange}
          id='email'
          placeholder='JohnDoe@email.com'
        />
        <Submit value='Send Link' />
        <div className='flex justify-between cursor-pointer text-xs mx-auto'>
          <a
            className=' text-white hover:text-gray-400'
            href='/auth/verification'
          >
            Forgot Password
          </a>
          <a href='/auth/signup' className=' text-white hover:text-gray-400 '>
            Sign up
          </a>
          <a href='/auth/signin' className=' text-white hover:text-gray-400 '>
            Login
          </a>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
