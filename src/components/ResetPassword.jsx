import React, { useEffect, useState } from "react";
import Title from "../auth/Title";
import FormInput from "../auth/FormInput";
import Submit from "../auth/Submit";
import { useLocation, useNavigate } from "react-router-dom";
import { setPassword, verifyPasswordResetToken } from "../API/Auth";
import { useNotification } from "../Hooks";
import { ImSpinner3 } from "react-icons/im";

//to fetch the id and token from query strings either use useLocation() or use SearchParams()
// const [searchParams] = useSearchParams()
// const token1 = searchParams.get('token')
// const id2 = searchParams.get('id')

const ConfirmPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isVerifying, setISVerifying] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const params1 = useLocation().search;
  const navigate = useNavigate();
  const token = new URLSearchParams(params1).get("token");
  const id = new URLSearchParams(params1).get("id");
  const { updateNotification } = useNotification();
  // console.log("token", token, "id", id);

  //isValid, isVerifying

  const handleformSubmit = async (e) => {
    console.log("e");
    e.preventDefault();
    const { ok, error } = validateUserInfo(newPassword, confirmPassword);
    if (!ok) {
      // console.log(error);
      return updateNotification("error", error);
    }
    const { error: err, message } = await setPassword(newPassword, id, token);
    if (err) {
      return updateNotification("error", err);
    }
    updateNotification("success", message);
    navigate("/auth/signIn", { replace: true });  // to redirect to signin page after password change
  };

  const validateUserInfo = (newPassword, confirmPassword) => {
    if (!newPassword) {
      return { ok: false, error: "Password field cannot be empty" };
    }

    if (!confirmPassword) {
      return { ok: false, error: "Confirm Password field cannot be empty" };
    }
    if (newPassword.length <= 5) {
      return {
        ok: false,
        error: "password should be greater then 5 characters",
      };
    }
    if (confirmPassword.length <= 5 || confirmPassword.lenth >= 7) {
      return {
        ok: false,
        error: "password should be between  5-7 characters",
      };
    }

    if (newPassword !== confirmPassword) {
      return { ok: false, error: "Passwords do not match" };
    }
    return { ok: true };
  };

  async function checkstatus() {
    setISVerifying(true);
    const { error, valid } = await verifyPasswordResetToken(token, id);
    // console.log("valid", valid);
    if (error) {
      setISVerifying(false);
      setIsValid(false);
      navigate("/auth/reset-password", { replace: true }); //to navigate back to reset password page when invalid token
      return updateNotification("error", error);
    }
    if (!valid) {
      setIsValid(false);
      return navigate("/auth/reset-password", { replace: true });
    }
    setIsValid(true);
    setISVerifying(false);
    // updateNotification("success", "Verified reset password");
  }

  const handleChange = (e) => {
    e.preventDefault();
    const { target } = e;
    const { name, value } = target;
    if (name === "newPassword") {
      setNewPassword(value);
    }
    if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  useEffect(() => {
    checkstatus();
  }, []);

  return isVerifying ? (
    <div className='bg-gray-700 w-96 mx-auto my-auto h-36 fixed items-center text-center text-white inset-0 flex justify-center gap-2'>
      <p>Please wait while we are veryfying Token</p>
      <p>
        <ImSpinner3 className='mx-auto animate-spin' />
      </p>
    </div>
  ) : !isValid ? (
    <div className='bg-gray-700 w-96 mx-auto my-auto h-36 fixed items-center text-center text-white inset-0 flex justify-center gap-2'>
      <p> Invalid Token Supplied</p>
    </div>
  ) : (
    <div className='bg-gray-700 w-72 mx-auto my-auto h-72 fixed items-center text-white inset-0 justify-center'>
      <form className='p-8' onSubmit={handleformSubmit}>
        <Title value='Enter new Password' />
        <FormInput
          name='newPassword'
          label='New Password'
          type='password'
          placeholder='****************'
          onChange={handleChange}
        />
        <FormInput
          name='confirmPassword'
          label='Confirm Password'
          type='text'
          placeholder='****************'
          onChange={handleChange}
        />

        <Submit value='Confirm Password' />
      </form>
    </div>
  );
};

export default ConfirmPassword;
