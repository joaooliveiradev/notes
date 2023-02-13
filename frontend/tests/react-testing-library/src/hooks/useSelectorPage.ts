import { useAppSelector } from "@/lib/test-utils";

type Page = {
  gitUser: {
    page: number;
    perPage: number;
  };
};

type Response = {
  perPage: number;
  page: number;
};

export function useSelectorPage(): Response {
  const currentPage = useAppSelector<Page>((state) => state.gitUser) as Response;

  return {
    perPage: currentPage.perPage,
    page: currentPage.page,
  };
}
