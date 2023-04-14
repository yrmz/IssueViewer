import { Box, Button, Container, Paper } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useIssues } from "../hooks/useQueries";
import Header from "./Header";
import { IssueList } from "./List";

export const Issues: React.FC<{}> = () => {
  const location = useLocation();
  // プログラム内の命名はキャメル型なので、repoIdsとして扱った方が良さそう
  const repoIds = location.state.repoIds as string;
  const { loading, error, data: issueValues } = useIssues(repoIds);

  // 仕様にもよりますが、ローディングを入れてあげれば、ユーザーもわかりやすいですしundefinedをなくせるので良いかも。
  if (loading || !issueValues?.nodes?.length) {
    return <div>Loading...</div>;
  }
  if (error) return <div>Error...</div>;

  const issueNode = issueValues.nodes[0];
  return (
    <div>
      <Header />
      <Container>
        <Paper sx={{ padding: 4, marginY: 5 }}>
          <Button variant="outlined">
            <Link style={{ textDecoration: "none", color: "#000" }} to="/">
              Return to Top
            </Link>
          </Button>
          <h2>{issueNode.name} Issues:</h2>
          <Box>
            <IssueList node={issueNode} />
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

// プロジェクトにもよると思うのですが、defaultを使ってしまうと規模が大きくなった時に
// どのコンポーネントが呼ばれているのかわかりずらくなってメンテが大変になるほで取り扱いには注意した方が良いです。
// export default Issues;
