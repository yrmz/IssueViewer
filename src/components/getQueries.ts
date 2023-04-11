import { ApolloClient, InMemoryCache } from "@apollo/client";
import {
  GET_REPOSITORIES,
  GET_REPOSITORY_ISSUES,
  GET_MY_REPOSITORIES,
} from "./queries";
import { IssueValues, GlobalRepository, LocalRepository } from "./types";

export const getGlobalRepositories = async (
  query: string,
  cursor: string | null,
  repositories: GlobalRepository[] | undefined,
  setRepositories: (repositories: GlobalRepository[]) => void,
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

    const newRepositories = response.data.search.edges
      ? response.data.search.edges.map(
          (edge: { node: React.ReactNode }) => edge.node
        )
      : [];

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

export const getLocalRepositories = async (
  query: string,
  cursor: string | null,
  repositories: LocalRepository[] | undefined,
  setRepositories: (repositories: LocalRepository[]) => void,
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
      query: GET_MY_REPOSITORIES,
      variables: {
        query,
        cursor,
      },
    });

    const newRepositories = response.data.search.edges
      ? response.data.search.edges.map(
          (edge: { node: React.ReactNode }) => edge.node
        )
      : [];

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

export const getIssues = async (
  repo_ids: string,
  setIssues: (issues: IssueValues) => void
) => {
  const client = new ApolloClient({
    uri: "https://api.github.com/graphql",
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_GITHUB_API_KEY}`,
    },
    cache: new InMemoryCache(),
  });
  const response = await client.query({
    query: GET_REPOSITORY_ISSUES,
    variables: {
      repo_ids,
    },
  });

  const repo = response.data.nodes[0] as IssueValues;
  setIssues(repo);
};
