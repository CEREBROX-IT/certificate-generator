import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import GuessUser from "./components/Navigation/GuessUser";
import AuthenticateUser from "./components/Navigation/AuthenticateUser";
import SplashScreen from "./screens/SplashScreen";
import { jwtDecode } from "jwt-decode";

function App() {
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const cookieString = document.cookie;

  const cookies = cookieString.split(";").map((cookie) => cookie.trim());

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
      setIsLoading(false);
    };

    const intervalId = setInterval(checkTokenValidity, 900);

    return () => clearInterval(intervalId);
  }, [tokenCookie]);

  return (
    <div className="parent-container">
      {isLoading ? (
        <SplashScreen displayMessage="Loading, please wait" />
      ) : (
        <BrowserRouter>
          {isTokenValid ? <AuthenticateUser /> : <GuessUser />}
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
