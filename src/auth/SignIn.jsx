import React, { useEffect, useState } from "react";
import FormInput from "../auth/FormInput";
import { AiFillEye } from "react-icons/ai";
import Submit from "./Submit";
import Title from "./Title";
import { useTheme } from "../Hooks";
import { Link, useNavigate } from "react-router-dom";
import { useNotification } from "../Hooks";
import { useAuth } from "../Hooks";

const validateUserInfo = ({ email, password }) => {
  let isvalidEmail = /^[\w\-.]+@([\w-]+\.)+[\w-]{2,}$/;

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

const SignIn = () => {
  const [isPassVisible, setPassVisible] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const { updateNotification } = useNotification();
  const { handleLogin, authInfo } = useAuth();
  const { isLoggedIn } = authInfo;
  const { email, password } = userInfo;
  const theme = useTheme(); //coming from hooks folder
  const navigate = useNavigate();

  const handlePasswordView = (e) => {
    e.preventDefault();
    setPassVisible(!isPassVisible);
  };

  const handleformSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);
    if (!ok) {
      return updateNotification("error", error);
    }
    await handleLogin(userInfo.email, userInfo.password);
    if (authInfo.error) {
      return updateNotification("error", authInfo.error);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { target } = e;
    const { name, value } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  //for flex occupying the whole space with flex, try using self-start// align-flex:start
  //neew things : peer in css,

  return (
    <div className='bg-gray-700 w-72 mx-auto my-auto h-80 fixed items-center text-white inset-0 justify-center'>
      <form className='p-8' onSubmit={handleformSubmit}>
        <Title value='SignIn' />
        <FormInput
          id='email'
          name='email'
          label='Email'
          value={email}
          placeholder='JohnDoe@email.com'
          onChange={handleChange}
        />
        <FormInput
          id='password'
          name='password'
          label='Password'
          value={password}
          // autoComplete={value.toString()}
          // autoComplete='true'
          type={isPassVisible ? "text" : "password"}
          placeholder='****************'
          onChange={handleChange}
        />
        <button
          className='hover:text-opacity-50 text-gray-50 absolute top-1/2 right-2 mt-3'
          onClick={handlePasswordView}
        >
          <AiFillEye />
        </button>

        <Submit value='Sign In' busy={authInfo.isPending} />
        <div className='flex justify-between mt-1 cursor-pointer text-xs'>
          <Link
            to='/auth/forget-password'
            className=' text-white hover:text-gray-400'
          >
            Forgot Password
          </Link>
          <Link to='/auth/signup' className='text-white'>
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
