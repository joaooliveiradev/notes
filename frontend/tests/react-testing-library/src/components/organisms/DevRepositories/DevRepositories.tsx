/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */
import { Repository } from "@/components/molecules";
import { useSelectorPage, useSelectorUser } from "@/hooks/";
import { useAppDispatch } from "@/lib/test-utils";
import { useRepositories } from "@/services/Users/hooks/useData";
import { changePage } from "@/store/GitHubUser/gitUserSlice";
import { Button, Grid, Spinner, Text } from "@chakra-ui/react";

export function DevRepositories(): JSX.Element {
  const dispatch = useAppDispatch();

  const { page, perPage } = useSelectorPage();
  const name = useSelectorUser();

  const { isLoading, error, data } = useRepositories(name, page, perPage);

  function handleLoadMore() {
    const loadMoreCount = perPage + 6;

    dispatch(
      changePage({
        perPage: loadMoreCount,
        page: 1,
      })
    );
  }

  return (
    <>
      <Grid data-testid="repos" templateColumns={["1fr", "repeat(3, 1fr)"]} gap="1rem">
        {isLoading && <Spinner data-testid="spinner" />}
        {!isLoading &&
          !error &&
          data?.map((repos) => {
            return (
              <Repository
                key={repos.id}
                name={repos.name}
                description={repos.description}
                html_url={repos.html_url}
                language={repos.language}
              />
            );
          })}
        {data && data.length <= 0 && <Text>No repositories found...</Text>}
      </Grid>
      {data && data.length > 0 && (
        <Button
          borderRadius="none"
          colorScheme="red"
          onClick={() => {
            handleLoadMore();
          }}
        >
          Load more...
        </Button>
      )}
    </>
  );
}
