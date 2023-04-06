import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GET_REPOSITORIES } from "./queries";

interface Repository {
  id: string;
  name: string;
}

export const getRepositories = async (
  query: string,
  cursor: string | null,
  repositories: Repository[] | undefined,
  setRepositories: (repositories: Repository[]) => void,
  setHasMoreItems: (hasMoreItems: boolean) => void,
  setEndCursor: (endCursor: string | null) => void
) => {
  const client = new ApolloClient({
    uri: "https://api.github.com/graphql",
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_GITHUB_API_KEY}`,
    },
    cache: new InMemoryCache(),
  });

  try {
    const response = await client.query({
      query: GET_REPOSITORIES,
      variables: {
        query,
        cursor,
      },
    });

    const newRepositories = response.data.search.edges.map(
      (edge: any) => edge.node
    );

    // repositories 引数が undefined の場合は空の配列を作成する
    const updatedRepositories = repositories
      ? [...repositories, ...newRepositories]
      : newRepositories;

    setRepositories(updatedRepositories);
    setHasMoreItems(response.data.search.pageInfo.hasNextPage);
    setEndCursor(response.data.search.pageInfo.endCursor);
  } catch (error) {
    console.error(error);
  }
};
