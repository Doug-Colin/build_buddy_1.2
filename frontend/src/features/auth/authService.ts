//Redux 'service' file strictly for making http requests, sending data back, and setting any data in local storage.

//import axios to make HTTP requests from within the application (as with with postman for backend) & send JWT if necessary
import axios from 'axios'

//define base url for making HTTP requests to the api endpoint for user registration
//add port path as a proxy to frontend package.json, so now http reqs will look at localhost 5050, then this endpoint
const API_URL = '/api/users/'

//define type for properties of the user data
export interface User {
    _id: string;
    name: string;
    email: string;
    createdAt: string; // ISO string representation of a date.
    updatedAt: string; // ''
  }

//define type for properties of data sent to backend when registering or loggin in
export interface RegisterUserData {
    name: string;
    email: string;
    password: string;
  }

//Register user
const register = async (userData: RegisterUserData): Promise<User> => {
    //store the response from the API in response variable
    const response = await axios.post(API_URL, userData)
    //if response contains data(w/token), successful registration, so store it locally so user stays authenticated
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//Login user
const login = async (userData: RegisterUserData): Promise<User> => {
  //store the response from the API in variable response.
  //path: API_URL = '/api/users/', so we only need to append 'login', no slash, to hit backend login endpoint
  const response = await axios.post(API_URL + 'login', userData)
  //if response contains data(w/token), successful registration, so store it locally so user stays authenticated
  if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

//logout user - note, this is a simple way of doing this (for now). Could later instead use server and add an http cookie
const logout = () => {
  localStorage.removeItem('user')
}

//any functions created for export go here
const authService = {
    register,
    logout,
    login
}

export default authService