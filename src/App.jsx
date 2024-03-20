import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GuessUser from "./components/Navigation/GuessUser";
import AuthenticateUser from "./components/Navigation/AuthenticateUser";
import { jwtDecode } from "jwt-decode";

function App() {
  const [isTokenValid, setIsTokenValid] = useState(false);

  const cookieString = document.cookie;

  // Split the cookie string into individual cookies
  const cookies = cookieString.split(";").map((cookie) => cookie.trim());

  // Find the cookie with the name "bridgette"
  const tokenCookie = cookies.find((cookie) => cookie.startsWith("bridgette="));

  useEffect(() => {
    const checkTokenValidity = () => {
      if (tokenCookie) {
        try {
          const decodedToken = jwtDecode(tokenCookie);
          const isTokenExpired = decodedToken.exp < Date.now() / 1000;

          setIsTokenValid(!isTokenExpired);
        } catch (error) {
          setIsTokenValid(false);
        }
      } else {
        setIsTokenValid(false);
      }
    };

    const intervalId = setInterval(checkTokenValidity, 300);

    return () => clearInterval(intervalId);
  }, [tokenCookie]);

  return (
    <div className="parent-container">
      <BrowserRouter>
        {isTokenValid ? <AuthenticateUser /> : <GuessUser />}
      </BrowserRouter>
    </div>
  );
}

export default App;
