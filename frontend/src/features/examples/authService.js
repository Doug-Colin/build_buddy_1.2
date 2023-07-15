//'service' file is strictly for making http requests, sending the data back, and setting any data in local storage.

/*import axios so we can:
    -make HTTP requests from within the application (like postman for frontend).
    -send our json web token if necessary
*/
import axios from 'axios'

//bsae url for making HTTP requests to the api endpoint for user registration
//rather than add the localhost port here, we can goto frontend package.json and add the port path as a proxy, so now http reqs will lookat localhost 5050 and then this endpoint
const API_URL = '/api/users/'

//Register user
const register = async (userData) => {
    //store the response from the API in response variable
    const response = await axios.post(API_URL, userData)
    //if response contains data(w/token), successful registration, so store it locally so user stays authenticated
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//Login user
const login = async (userData) => {
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