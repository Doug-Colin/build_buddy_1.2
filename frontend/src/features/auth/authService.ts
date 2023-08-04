//Redux 'service' file: strictly for http reqs, sending data back, & setting relevant data in local storage.

//to makie HTTP reqs from within app & send JWT if necessary
import axios from "axios";
import { User, LoginUserData, RegisterUserData } from "@/types/types";

//define base url for making HTTP requests to the api endpoint for auth
//add port to this path (backend) as proxy in vite config so http reqs look there, then @ this endpoint
const API_URL = "/api/users/";

//Register user
const register = async (userData: RegisterUserData): Promise<User> => {
  
  try {
    const response = await axios.post(API_URL, userData); //store the response from the API
    //response contains data(w/token)? reg. successful, store token locally to keep user authenticated
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

//Login user
const login = async (userData: LoginUserData): Promise<User> => {

  try {
    const response = await axios.post(API_URL + "login", userData);
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

//simple logout user - could later instead use server and add an http cookie
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
