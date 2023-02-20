import { useAppSelector } from "@/lib/test-utils";

type User = {
  gitUser: {
    name: string;
    page: number;
    perPage: number;
  };
};

export function useSelectorUser() {
  const name = useAppSelector<User, string>((state) => state.gitUser.name);
  return name
}
