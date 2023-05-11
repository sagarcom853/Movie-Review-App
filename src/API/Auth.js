// This file serves as a gateway between the frontend and the backend, these methods are directly used in frontend, we are calling the Api's here,
//Api integration takes placce here

import client from "./client";
import axios from "axios";

//calling create user API
export const createUser = async (userInfo) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/user/create",
      userInfo
    );
    return response.data;
  } catch (error) {
    const { response } = error;
    if (response && response.status && response.data) {
      return {
        error: response.data.error,
      };
    } else {
      return {
        error: error.message || "Unknown error",
      };
    }
  }
};

//Calling verify user Email API
export const verifyUser = async (userInfo) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/user/verify-email",
      userInfo
    );
    return response.data;
  } catch (error) {
    const { response } = error;
    if (response && response.status && response.data) {
      return {
        error: response.data.error,
      };
    } else {
      return {
        error: error.message || "Unknown error",
      };
    }
  }
};

//Calling SiginUserP API
export const SignInUSer = async (userInfo) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/user/signIn",
      userInfo
    );
    return response.data;
  } catch (error) {
    const { response } = error;
    if (response && response.status && response.data) {
      return {
        error: response.data.error,
      };
    } else {
      return {
        error: error.message || "Unknown error",
      };
    }
  }
};

//to fetch user details from backend, using local storage, and fetching user from the backend in response
export const getIsAuth = async (token) => {
  try {
    const response = await axios.get("http://localhost:8000/api/user/is-auth", {
      headers: { Authorization: "Bearer " + token, accept: "application/json" },
    });
    return response.data;
  } catch (error) {
    const { response } = error;
    if (response && response.status && response.data) {
      return {
        error: response.data.error,
      };
    } else {
      return {
        error: error.message || "Unknown error",
      };
    }
  }
};

//to send email id to forget password for sending password change link to mail
export const forgetPassword = async (email) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/user/forget-password",
      { email }
    );
    return response.data;
  } catch (error) {
    const { response } = error;
    if (response && response.status && response.data) {
      return {
        error: response.data.error,
      };
    } else {
      return {
        error: error.message || "Unknown error",
      };
    }
  }
};
export const verifyPasswordResetToken = async (token, userId) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/user/verify-pass-reset-token",
      {
        token,
        userId,
      }
    );
    return response.data
  } catch (error) {
    const { response } = error;
    if (response && response.status && response.data) {
      return {
        error: response.data.error,
      };
    } else {
      return {
        error: error.message || "Unknown error",
      };
    }
  }
};
export const setPassword = async (newPassword, userId,token) => {
  console.log(newPassword,userId)
  try {
    const response = await axios.post(
      "http://localhost:8000/api/user/reset-password",
      {
        newPassword,
        userId,
        token
      }
    );
    return response.data;
  } catch (error) {
    const { response } = error;
    if (response && response.status && response.data) {
      return {
        error: response.data.error,
      };
    } else {
      return {
        error: error.message || "Unknown error",
      };
    }
  }
};
export const resendEmailVerificationToken = async (userId) => {
  console.log("userId inside resend",userId)
  try {
    const response = await axios.post(
      "http://localhost:8000/api/user/resend-email",
      {
      userId
      }
    );
    return response.data;
  } catch (error) {
    const { response } = error;
    if (response && response.status && response.data) {
      return {
        error: response.data.error,
      };
    } else {
      return {
        error: error.message || "Unknown error",
      };
    }
  }
};

