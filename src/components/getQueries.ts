import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GET_REPOSITORY_ISSUES } from "./queries";
import { IssueValues } from "./types";

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
