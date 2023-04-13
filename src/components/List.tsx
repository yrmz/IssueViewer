import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import { IssueValues, LocalRepository } from "./types";
import { useQuery } from "@apollo/client";
import {
  SearchRepositoriesDocument,
  SearchRepositoriesQuery,
  Repository,
} from "../generated/graphql";

// 公開されているすべてのリポジトリを検索
export const GlobalRepositoryList = ({
  query,
  cursor,
}: {
  query: string;
  cursor: string | null;
}) => {
  const { data, loading, error } = useQuery<SearchRepositoriesQuery>(
    SearchRepositoriesDocument,
    { variables: { query: query, cursor: cursor } }
  );

  return (
    <List>
      {data &&
        data?.search?.edges
          ?.map((e) => e?.node)
          .filter((e): e is Repository => {
            return e?.__typename === "Repository";
          })
          .map((edge) => (
            <ListItem key={edge.id} divider>
              <Link
                style={{
                  textDecoration: "none",
                  color: "#000",
                  fontWeight: "bold",
                }}
                to="/issues"
                state={{ repo_ids: edge.id }}>
                <ListItemText>Repository Name:{edge.name}</ListItemText>
                <ListItemText>Descriptiion:{edge.description}</ListItemText>
              </Link>
            </ListItem>
          ))}
    </List>
  );
};

export const IssueList = ({ issues }: { issues: IssueValues | undefined }) => {
  return (
    <List>
      {issues?.issues.edges.map((issue) => (
        <ListItem key={issue.node.title} divider>
          <ListItemText primary={issue.node.title} />
        </ListItem>
      ))}
    </List>
  );
};

// 自分のアカウントに紐付いたリポジトリの一覧を表示
export const LocalRepositoryList = () => {};
