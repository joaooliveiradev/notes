import { useAppSelector } from "@/lib/test-utils";

type User = {
  gitUser: {
    name: string;
  };
};

export function useSelectorUser(): string {
  const userData = useAppSelector<User>((state) => state.gitUser.name);
  return userData as string;
}
