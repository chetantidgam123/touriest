import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8080" })

export const SignIn = (formData) => API.post("/user/login", formData)
export const SignUp = (formData) => API.post("/user/register", formData)