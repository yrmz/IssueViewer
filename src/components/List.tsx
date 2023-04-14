import { useQuery } from "@apollo/client";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { FC } from "react";
import { Link } from "react-router-dom";
import {
  Repository,
  SearchRepositoriesDocument,
  SearchRepositoriesQuery,
} from "../generated/graphql";
import { IssueNode } from "./types";

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
                // stateでの渡し方を見つけて使ってるのいいですね！
                state={{ repoIds: edge.id }}>
                <ListItemText>Repository Name:{edge.name}</ListItemText>
                <ListItemText>Description:{edge.description}</ListItemText>
              </Link>
            </ListItem>
          ))}
    </List>
  );
};

export const IssueList:FC<{ node: IssueNode  }> = ({ node }) => {
  return (
    <List>
      {node.issues.edges.map((issue) => (
        <ListItem key={issue.node.title} divider>
          <ListItemText primary={issue.node.title} />
        </ListItem>
      ))}
    </List>
  );
};

// 自分のアカウントに紐付いたリポジトリの一覧を表示
export const LocalRepositoryList = () => {};
