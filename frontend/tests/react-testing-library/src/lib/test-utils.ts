import "@testing-library/jest-dom";
import { useDispatch, useSelector } from "react-redux";
import store from "@/store/GitHubUser/store";
import { rest } from "msw";
import { type UsersRepositoriesResponse } from "@/services/Users/Users.types";
import { setupServer } from "msw/node";

type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`, in this way, we can use this functions inside React Testing Library
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = useSelector;

export const repositories: UsersRepositoriesResponse[] = [
  {
    id: "c627deb2a-c917-4dcb-ac32-406xc6c6c911d",
    fork: false,
    html_url: "https://github.com/Santosl2/github-finder",
    language: "pt-BR",
    name: "Github Finder v1",
    stargazers_count: 1,
  },
  {
    id: "c627debdasdsa-c917-4dcd-ac32-406xc6c6c911d",
    fork: false,
    html_url: "https://github.com/Santosl2/github-finder",
    language: "pt-BR",
    name: "Github Finder v2",
    stargazers_count: 1,
  },
];

const handlers = [
  rest.get("/getUser", (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(repositories));
  }),
];

export const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
