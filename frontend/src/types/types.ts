// src/features/auth

//type for properties of data sent to backend when user registers or logs in via form
export interface RegisterUserData {
    name: string;
    email: string;
    password: string;
  }

//type for properties of data sent to backend when user registers or logs in via form
export interface LoginUserData {
    email: string;
    password: string;
  }

//Type for properties of the user data
export interface User {
    _id: string;
    name: string;
    email: string;
    token: string;
  }

