// Redux service for authentication-related HTTP requests and local storage operations.

import axios from "axios";
import { User, LoginUserData, RegisterUserData } from "@/types/types";


const API_URL = "/api/users/";

// Registers user & stores the token in local storage.
const register = async (userData: RegisterUserData): Promise<User> => {
  
  try {
    const response = await axios.post(API_URL, userData); 
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

// Authenticates user & stores token in local storage.
const login = async (userData: LoginUserData): Promise<User> => {

  try {
    const response = await axios.post(API_URL + "login", userData);
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    console.error("Error loggin in user:", error);
    throw error;
  }
};

//Logs out user by removing token from local storage
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
