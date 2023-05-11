//Authentication file to check the login credentials including the token and redirect to page after correct user signin and signup

import React, { createContext, useEffect, useState } from "react";
import { SignInUSer, getIsAuth } from "../../API/Auth";
// import { useNotification } from "../../Hooks/";
export const AuthContext = createContext();

// whenever we handle logout part we will need exact AuthInfo, for that we need defaultInfo.
const defaultAuthInfo = {
  profile: null,
  isLoggedIn: false,
  isPending: false, // to show any indicators example spinner in button.
  error: "",
};

//user fetched from backend contains id,name,email,token
const AuthProvider = ({ children }) => {
  // const { updateNotification } = useNotification();

  const [authInfo, setAuthInfo] = useState({ ...defaultAuthInfo }); // set the authinfo value to defaultAuthInfo to avoid any breaking
  // we will handleLogin inside our signin coqmponent which has email and password.
  const handleLogin = async (email, password) => {
    setAuthInfo({ ...authInfo, isPending: true });
    const { error, user } = await SignInUSer({ email, password }); //  <-- sending the email, password as an object because the signinuser method accepts object that contains email,password.
    if (error) {
      setAuthInfo({ ...authInfo, isPending: false, error: error });
      return;
    // return  updateNotification("error", error);
    }
    //if there is no error, we will set user profile and signin the user with the user details
    setAuthInfo({
      profile: { ...user },
      isPending: false,
      isLoggedIn: true,
      error: "",
    });
    localStorage.setItem("auth-token", user.token); // !whhy??  !!edit: because since token will be stored in local storage, if we are loggedin,we dont need to login aain and aain and it is used to save the state
  };

  const handleLogout = async () => {
    //setAuthInfo({...authInfo, isLoggedIn: false, isPending:false, profile:{}})
    setAuthInfo({ ...defaultAuthInfo });
    localStorage.removeItem("auth-token");
  };

  //fetching token from local storage automatically even if we dont login, if no token, we wont do anything.
  const isAuth = async () => {
    const token = localStorage.getItem("auth-token");
    if (!token) return;
    setAuthInfo({ ...authInfo, isPending: true });
    //fetch user from localStorage from backend using the token.
    const { user, error } = await getIsAuth(token);
    if (error) {
      return setAuthInfo({ ...authInfo, isPending: false, error: error });
    }
    //set the authInfo with the user details in profile, and other states such as isLoggedIn after successful login
    setAuthInfo({
      profile: { ...user },
      isLoggedIn: true,
      isPending: false,
      error: "",
    });
  };

  //if any change happens useeffect will be called,which will fetch the tokens present in localStorage, and then from there the profile details will be set in authInfo
  useEffect(() => {
    isAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ handleLogin, authInfo, isAuth, handleLogout }} //these vailues can be accessed anywhere in the application using context
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
