import axios, { AxiosInstance } from "axios";

const axiosIntance: AxiosInstance = axios.create({ baseURL: "https://pokeapi.co/api/v2" });

export default axiosIntance;
