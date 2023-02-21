import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.github.com/users/",
  headers:
    process.env.NODE_ENV === "production"
      ? {
          Authorization: `Bearer ${process.env.GITHUB_RATE_LIMIT_TOKEN}`,
        }
      : undefined,
});
