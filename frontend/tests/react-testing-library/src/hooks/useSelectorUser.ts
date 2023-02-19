import { useAppSelector } from "@/lib/test-utils";

type User = {
  user: {
    name: string;
    page: number;
    perPage: number;
  };
};

export function useSelectorUser() {
  const userData = useAppSelector<User, User['user']>((state) => state.user);
  return userData.name
}
