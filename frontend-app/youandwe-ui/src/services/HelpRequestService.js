import axios from "axios";
import { getToken } from "./AuthService";

const BASE_REST_API_URL = 'http://localhost:8080/api/helpRequests';

// export function getAllHelpRequests(){
//     return axios.get(BASE_REST_API_URL);
// }

// Add a request interceptor
axios.interceptors.request.use(function (config) {

    config.headers['Authorization'] = getToken();

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

export const getAllHelpRequests = () => axios.get(BASE_REST_API_URL)

export const saveHelpRequest = (helpRequest) => axios.post(BASE_REST_API_URL, helpRequest)

export const getHelpRequest = (id) => axios.get(BASE_REST_API_URL + '/' + id)

export const updateHelpRequest = (id, helpRequest) => axios.put(BASE_REST_API_URL + '/' + id, helpRequest)

export const deleteHelpRequest = (id) => axios.delete(BASE_REST_API_URL + '/' + id)


// ---------------------------------------without jwt--------------
// import axios from "axios";
// import { getToken } from "./AuthService";

// const BASE_REST_API_URL = 'http://localhost:8080/api/user';

// export function getLoggedInUser() {
//     return axios.get(BASE_REST_API_URL);
// }

// // Add a request interceptor
// axios.interceptors.request.use(function (config) {

//     config.headers['Authorization'] = getToken();

//     return config;
// }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
// });



// export const saveNewUser = (user) => axios.post(BASE_REST_API_URL, user)

// export const findByID = (id) => axios.get(BASE_REST_API_URL + '/' + id)



// export const deleteByID = (id) => axios.delete(BASE_REST_API_URL + '/' + id)
