import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import { Paper, Container, Box, Button } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

interface Issue {
  title: string;
}

interface Repository {
  id: string;
  name: string;
  issues: {
    edges: {
      node: Issue;
    }[];
  };
}

interface State {
  repo_ids: string;
}

const Issues: React.FC = () => {
  const location = useLocation();
  const { repo_ids } = location.state as State;
  const [repository, setRepository] = useState<Repository>();

  useEffect(() => {
    const getIssues = async () => {
      const response = await axios({
        url: "https://api.github.com/graphql",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_GITHUB_API_KEY}`,
        },
        method: "POST",
        data: {
          query: `{
            nodes(ids: "${repo_ids}") {
              ... on Repository {
                id
                name
                issues(first: 10) {
                  edges {
                    node {
                      title
                    }
                  }
                }
              }
            }
          }`,
        },
      });

      const repo = response.data.data.nodes[0] as Repository;
      setRepository(repo);
    };

    getIssues();
  }, [repo_ids]);

  return (
    <div>
      <Header />
      <Container>
        <Paper sx={{ padding: 4, marginY: 5 }}>
          <Button variant="outlined">
            <Link to="/">Return to Top</Link>
          </Button>
          <h2>{repository?.name} Issues:</h2>
          <Box>
            <List>
              {repository?.issues.edges.map((issue) => (
                <ListItem key={issue.node.title} divider>
                  <ListItemText>{issue.node.title}</ListItemText>
                </ListItem>
              ))}
            </List>
          </Box>
        </Paper>
      </Container>
      <ul></ul>
    </div>
  );
};

export default Issues;
