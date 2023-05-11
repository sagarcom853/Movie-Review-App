// Notification  Component is rendred in contextApi, because we want that throughout our app
//This is for the errors,sucess messages throughout the app
import React, { createContext, useState } from "react";

export const NotificationContext = createContext();

let timeoutId;
const NotificationProvider = ({ children }) => {
  const [Notification, setNotification] = useState("");
  const [classes, setClasses] = useState("");

  const updateNotification = (type, value) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      console.log(timeoutId)
    }
    console.log(type, value);
    switch (type) {
      case "error":
        setClasses("bg-red-500");
        break;
      case "success":
        setClasses("bg-green-500");
        break;
      case "warning":
        setClasses("bg-orange-500");
        break;
      default:
        setClasses("bg-red-500");
    }
    setNotification(value);
    timeoutId = setTimeout(() => {
      setNotification("");
    }, 3000);
  };
  return (
    <NotificationContext.Provider value={{ updateNotification }}>
      {children}
      {Notification && (
        <div
          className={
            classes +
            " " +
            "text-white w-72 mx-auto align-center p-2 mb-2 text-center bounce-center rounded shadow-md shadow-black-400"
          }
        >
          {Notification}
        </div>
      )}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
