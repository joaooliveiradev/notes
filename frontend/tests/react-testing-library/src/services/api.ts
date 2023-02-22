import * as dotenv from "dotenv"
dotenv.config()
import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.github.com/users/",
  headers: {
    Authorization: `Bearer ${process.env.GITHUB_RATE_LIMIT_TOKEN}`,
  },
});
