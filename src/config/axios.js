import axios from "axios";

const app = axios.create({baseURL:"http://localhost:4020"});
export default app;