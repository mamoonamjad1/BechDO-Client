import axios from "axios";

export class AuthServices {
  loginUser = async (data) => {
    return await axios.post('http://localhost:5000/user/auth/login', data);
  }

  registration = async (data) =>{
    return await axios.post('http://localhost:5000/user/auth/register', data)
  }
}
