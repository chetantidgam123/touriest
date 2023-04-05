import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" })

export const SignIn = (formData) => API.post("/user/signin", formData);
export const SignUp = (formData) => API.post("/user/signup", formData);
export const googleSignIn = (formData) => API.post("/user/googleSignIn", formData)