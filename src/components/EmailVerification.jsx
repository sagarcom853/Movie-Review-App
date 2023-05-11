// To verify the OTP coming in Email Id

import React, { useState, useEffect, useRef } from "react";
import Submit from "../auth/Submit";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { verifyUser, resendEmailVerificationToken } from "../API/Auth";
import { useAuth, useNotification } from "../Hooks/index";
const OTP_LENGTH = 6;
const EmailVerification = () => {
  const [otp, setOTP] = useState(new Array(OTP_LENGTH).fill(""));
  const [activeOTPindex, setActiveOTPIndex] = useState(0);
  let currentOTPindex;

  const inputRef = useRef();
  const locate = useLocation();
  const navigate = useNavigate();
  const { authInfo, isAuth } = useAuth();
  const { isLoggedIn } = authInfo;
  const user = locate.state?.user; //fetch the user data from the signup page using state object
  const isVerified = user?.isVerified;
  const { updateNotification } = useNotification();

  const isValidOTP = (otp) => {
    let valid = false;
    for (let i of otp) {
      valid = !isNaN(parseInt(i)); // checking if each element in otp is a valid number, if any element is false ,invalid otp, all elements should be valid
      if (!valid) break;
    }
    return valid;
  };

  const validateOTP = (otp) => {
    //! We cannot use these validation methods as the otp is array with empty values which are counted as elemnets [1,'',3,'']
    // if (!parseInt(otp.length)>0)
    //   return { ok: false, error: `OTP should be ${OTP_LENGTH} charcters long` };
    // if (parseInt(otp.length) !== OTP_LENGTH)
    //   return {
    //     ok: false,
    //     error: `OTP should be ${OTP_LENGTH} characters long`,
    //   };

    if (!isValidOTP(otp)) return { ok: false, error: "Invalid OTP" };
    if (!/^[0-9]+$/.test(otp))
      return {
        ok: false,
        error: "OTP should only contain numbers nd must be 6 charcters",
      };

    return { ok: true, error: "" };
  };

  const handleformSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateOTP(otp);
    if (!ok) {
      console.log(error);
      // updateNotification("error", "Invalid OTP123");
    }
    //how should i fetch userId?
    let userInfo = {};
    userInfo.OTP = otp.join("");
    userInfo.userId = user.id;
    let response = await verifyUser(userInfo);
    if (response.error) return updateNotification("error", response.error);
    updateNotification("success", response.message);
    //TODO previously we were just consoling the errors or the responses, now we are showin the notifications
    localStorage.setItem("auth-token", response.user.token);
    isAuth();
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOTPindex]);

  useEffect(() => {
    if (!user) navigate("/notfound"); // if state doesn't exists for user, redirect to not found page
    if (isLoggedIn && isVerified) {
      navigate("/");
    }
  }, [locate.state, user, isLoggedIn, isVerified]);

  const focusPrevInputField = (index) => {
    let nextIndex;
    const diff = index - 1;
    nextIndex = diff !== 0 ? diff : 0;
    setActiveOTPIndex(nextIndex);
  };

  const focusNextInputField = (index) => {
    setActiveOTPIndex(index + 1);
  };

  const handleOTPChange = ({ target }, index) => {
    const { value } = target;
    const newOTP = [...otp];
    // newOTP[index] = value.substring(0, 1);
    newOTP[currentOTPindex] = value.substring(value.length - 1, value.length);
    if (!value) focusPrevInputField(currentOTPindex);
    else focusNextInputField(currentOTPindex);
    // setActiveOTPIndex(index + 1);
    setOTP([...newOTP]);
  };

  const handlekeyDown = (e, index) => {
    currentOTPindex = index;
    e.stopPropagation();
    if (e.key === "Backspace") {
      const newOTP = [...otp];
      newOTP[currentOTPindex + 1] = null;
      focusPrevInputField(currentOTPindex);
    }
  };
  const handleResend = async (e) => {
    e.preventDefault();
    const { error, message } = await resendEmailVerificationToken(user.id);
    if (error) {
      return updateNotification("error", error);
    }
    updateNotification("success", message);
  };

  const showcollapsedEmail = () => {
    console.log(user)
    let { email } = user
     const atIndex = email.indexOf("@");
     if (atIndex <= 2) {
       return email;
     }
     const username = email.substring(0, atIndex);
     const maskedUsername =
       username.substring(0, 2) + "*".repeat(username.length - 2);
     const domain = email.substring(atIndex);
     return maskedUsername + domain;
  }

  return (
    <div className='bg-gray-700 w-72 mx-auto my-auto h-72 fixed text-white inset-0 items-center'>
      <form className='p-5' onSubmit={handleformSubmit}>
        <div>
          <h6 className='text-sm mx-auto font-semibold'>
            Please Enter the OTP to verify your account
          </h6>
          <p className='text-xs mx-auto text-gray-400 font-semibold pl-2'>
            OTP has been sent to your email&nbsp;
            <span className='text-white'>{ showcollapsedEmail()}</span>
          </p>
        </div>
        <div className='flex m-2 justify-center items-center'>
          {otp.map((_, index) => {
            return (
              <div key={index} className='cursor-pointer'>
                <input
                  ref={
                    Number(activeOTPindex) === Number(index) ? inputRef : null
                  }
                  type='number'
                  id={index}
                  key={index}
                  value={otp[index] || ""}
                  onChange={(e) => handleOTPChange(e, index)}
                  onKeyDown={(e) => handlekeyDown(e, index)}
                  className='spin-button-none w-10 h-10 border-2 m-1 max-1
                   text-white text-center rounded bg-transparent'
                />
              </div>
            );
          })}
        </div>
        <Submit value='Verify Account' />
        <div className='flex mt-1 cursor-pointer text-xs '>
          <p> Didn't get the code? </p>{" "}
          <button
            className='text-white hover:text-primary ml-2'
            onClick={handleResend}
          >
            Resend
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmailVerification;
