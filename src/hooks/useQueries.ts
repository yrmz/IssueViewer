import { ApolloError, useQuery } from "@apollo/client";
import { GET_REPOSITORY_ISSUES } from "../components/queries";
import { IssueValues } from "../components/types";

// コンポーネントを持っていないのでcustom hookとして定義した方が良さそう。
export const useIssues = (
  repoIds: string,
): {
  loading: boolean;
  error: ApolloError | undefined
  data: IssueValues | undefined;
} => {

  // ApolloProviderを定義してるので、ここでclientを定義する必要はなさそう。
  // const client = new ApolloClient({
  //   uri: "https://api.github.com/graphql",
  //   headers: {
  //     Authorization: `Bearer ${process.env.REACT_APP_GITHUB_API_KEY}`,
  //   },
  //   cache: new InMemoryCache(),
  // });

  // useQueryを使ってあげれば良さそう
  const { loading, error, data } = useQuery<IssueValues>(GET_REPOSITORY_ISSUES, {
    variables: {
      repo_ids: repoIds,
    },
  });


  return {
    loading,
    error,
    data,
  }
};
