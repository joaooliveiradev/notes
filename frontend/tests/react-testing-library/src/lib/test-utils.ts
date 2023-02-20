import { useDispatch, useSelector } from "react-redux";
import store from "@/store/GitHubUser/store";
import { rest } from "msw";
import { setupServer } from "msw/node";

type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`, in this way, we can use this functions inside React Testing Library
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = useSelector;

const handlers = [
  //to fail in DevRepositories
  rest.get("https://api.github.com/users/:users/repos", (req, res, ctx) => {
    return res(ctx.status(500));
  }),
];

export const server = setupServer(...handlers);
