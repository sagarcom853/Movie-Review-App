import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../auth/FormInput";
import { AiFillEye } from "react-icons/ai";
import Submit from "./Submit";
import Title from "./Title";
import { Link } from "react-router-dom";
import { createUser } from "../API/Auth";
import { useAuth, useNotification } from "../Hooks";

const validateUserInfo = ({ name, email, password }) => {
  let isvalidEmail = /^[\w\-.]+@([\w-]+\.)+[\w-]{2,}$/;
  let isvalidName = /^[A-z a-z]+$/;
  if (!name.trim()) {
    return { ok: false, error: "Name is missing" };
  }
  if (name.length <= 5 && name.lenth >= 10) {
    return { ok: false, error: "Name should be between 5-10 characters" };
  }
  if (!isvalidName.test(name)) return { ok: false, error: "Invalid name" };
  if (!email.trim()) {
    return { ok: false, error: "Email is missingg" };
  }
  if (!isvalidEmail.test(email))
    return { ok: false, error: "Email is not valid" };

  if (!password.trim()) {
    return { ok: false, error: "Password is missingg" };
  }
  if (password.length <= 8 || password.lenth >= 15) {
    return { ok: false, error: "Password should be between 8-15 characters" };
  }
  return { ok: true };
};

const Signup = () => {
  const [isPassVisible, setPassVisible] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { updateNotification } = useNotification();
  const navigate = useNavigate();
  const { name, email, password } = userInfo;
  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;

  const handlePasswordView = (e) => {
    e.preventDefault();
    setPassVisible(!isPassVisible);
  };

  const handleformSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);
    if (!ok) {
      // console.log(error);
      return updateNotification("error", error);
    }
    let response = await createUser(userInfo);
    console.log("response in signup",response)
    console.log(response);
    if (response.error) {
      return updateNotification("error", response.error);
    }
    setTimeout(() => {
      navigate("/auth/verification", {
        state: { user: response.user }, //navigating to verification page, and sending state= userData to the page
        replace: true,
      }); // replace will prevent them to go back to the pervious screen, here signup from verification page
    }, 1000);
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { target } = e;
    const { name, value } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  // if user is logged in if trying to signup, navigate to home
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  return (
    <div className=''>
      {/* <div className='bg-gray-700 mx-auto w-72 h-3/4 items-center text-white justify-center'> */}
      <div className='bg-gray-700 w-72 mx-auto my-auto h-96 fixed items-center text-white inset-0  justify-center'>
        <form className='p-8' onSubmit={handleformSubmit}>
          <Title value='SignUp' />
          <FormInput
            id='name'
            name='name'
            label='Name'
            value={name}
            placeholder='Enter your name'
            onChange={handleChange}
          />

          <FormInput
            id='email'
            name='email'
            label='Email Address'
            value={email}
            placeholder='JohnDoe@email.com'
            onChange={handleChange}
          />
          <FormInput
            id='password'
            name='password'
            label='Password'
            value={password}
            type={isPassVisible ? "text" : "password"}
            placeholder='****************'
            onChange={handleChange}
          />
          <button
            className='hover:text-opacity-50 text-gray-50 absolute top-2/3 -mt-6 right-2'
            onClick={handlePasswordView}
          >
            <AiFillEye />
          </button>

          {/* <FormInput
          type='date'
          label='Date Of Birth'
          placeholder='dd/mm/yyyy'
          name='date'
        /> */}
          <div className='flex flex-wrap mt-2'>
            <input
              type='checkbox'
              id='terms'
              name='terms'
              // value={date}
              onChange={handleChange}
            />
            <label htmlFor='checkbox' id='terms' className='text-xs ml-2'>
              I agree to the terms and conditons
            </label>
          </div>

          <Submit value='Sign Up' />
          <div className='flex mt-1 cursor-pointer text-xs '>
            <p> Already a Member?</p>{" "}
            <Link
              to='/auth/signin'
              className='text-white hover:text-primary ml-2'
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
