import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ThemeProvider from "./components/context/ThemeProvider";
import NotificationProvider from "./components/context/NotificationProvider";
import AuthProvider from "./components/context/AuthProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <NotificationProvider>
          <App />
        </NotificationProvider>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);

// we can create a separate contextProviders Component in the context folder, and wrap all the providers with App.js as a children to be cleaner
