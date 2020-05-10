import axios from "axios";

// function axiosWithAuth() {

//   return axios.create({
//     baseURL: process.env.REACT_APP_DOMAIN_NAME,
//     headers: {
//       "Content-Type": "application/json",
//       "Access-Control-Allow-Credentials": true,
//     },
//     withCredentials: true,
//   });
// }

function axiosWithAuth() {
  const token = localStorage.getItem('token');

  return axios.create({
    baseURL: process.env.REACT_APP_DOMAIN_NAME,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
  },
  });
}

function axiosWithoutAuth() {
  return axios.create({
    baseURL: process.env.REACT_APP_DOMAIN_NAME,
  });
}

export { axiosWithAuth, axiosWithoutAuth };
