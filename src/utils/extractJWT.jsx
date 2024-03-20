import { jwtDecode } from "jwt-decode";

export const getUserDatafromToken = () => {
  // Retrieve the cookie string
  const cookieString = document.cookie;

  // Split the cookie string into individual cookies
  const cookies = cookieString.split(";").map((cookie) => cookie.trim());

  // Find the cookie with the name "bridgette"
  const tokenCookie = cookies.find((cookie) => cookie.startsWith("bridgette="));

  if (tokenCookie) {
    const token = tokenCookie.split("=")[1];

    try {
      const decodedToken = jwtDecode(token);
      return {
        decodedToken,
      };
    } catch (error) {
      console.error("Error decoding token:", error);
      // Handle token decoding error gracefully
      return null;
    }
  } else {
    console.error("Token cookie not found");
    // Handle token cookie not found gracefully
    return null;
  }
};
