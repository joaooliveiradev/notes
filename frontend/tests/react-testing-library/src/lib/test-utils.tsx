import "@testing-library/jest-dom/extend-expect";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "@/store/GitHubUser/store";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { QueryClient, QueryClientProvider, setLogger } from "react-query";
import { render } from "@testing-library/react";

type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`, in this way, we can use this functions inside React Testing Library
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = useSelector;

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

export function renderWithClient(ui: React.ReactElement) {
  const queryClient = createQueryClient();
  const { rerender, ...result } = render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
    </Provider>
  );
  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) =>
      rerender(
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            {rerenderUi}
          </QueryClientProvider>
        </Provider>
      ),
  };
}

export const reduxWrapper = ({ children }: { children: React.ReactElement }) => (
  <Provider store={store}>{children}</Provider>
);

export const reactQueryWrapper = ({ children }: { children: React.ReactElement }) => {
  const queryClient = createQueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

//MSW
const handlers = [
  //Get Repos -> To Fail
  rest.get("https://api.github.com/users/:users/repos", (req, res, ctx) => {
    return res(ctx.status(500));
  }),
];

export const server = setupServer(...handlers);

beforeAll(() => {
  setLogger({ log: () => {}, warn: () => {}, error: () => {} });
});

afterAll(() => server.close());
