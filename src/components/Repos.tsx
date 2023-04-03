import React, { useState } from "react";
import Header from "./Header";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import InfiniteScroll from "react-infinite-scroller";
import { Link } from "react-router-dom";
import { Button, Paper, Container, Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { GET_REPOSITORIES } from "./queries";

import "./styles.css";
interface Repository {
  id: string;
  name: string;
}

const Repos: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [hasMoreItems, setHasMoreItems] = useState<boolean>(true);
  const [endCursor, setEndCursor] = useState<string | null>(null);

  const client = new ApolloClient({
    uri: "https://api.github.com/graphql",
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_GITHUB_API_KEY}`,
    },
    cache: new InMemoryCache(),
  });
  const getRepositories = async () => {
    try {
      const response = await client.query({
        query: GET_REPOSITORIES,
        variables: {
          query,
          cursor: endCursor,
        },
      });

      const newRepositories = response.data.search.edges.map(
        (edge: any) => edge.node
      );
      setRepositories([...repositories, ...newRepositories]);
      setHasMoreItems(response.data.data.search.pageInfo.hasNextPage);
      setEndCursor(response.data.data.search.pageInfo.endCursor);
    } catch (error) {
      console.error(error);
    }
  };

  const loadMore = () => {
    getRepositories();
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRepositories([]);
    setEndCursor(null);
    getRepositories();
  };

  return (
    <div>
      <Container>
        <Header />
        <Paper sx={{ padding: 4, marginY: 5 }}>
          <form onSubmit={handleSubmit}>
            <Box>
              <TextField
                size="small"
                label="Repository Name"
                type="text"
                className="Search"
                placeholder="検索"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                sx={{ marginRight: 3 }}
              />
              <Button variant="outlined" type="submit">
                Search
              </Button>
            </Box>
          </form>
          <InfiniteScroll
            pageStart={0}
            initialLoad={false}
            loadMore={loadMore}
            hasMore={hasMoreItems}
            useWindow={true}
            threshold={100}>
            <List>
              {repositories.map((repository, index) => (
                <ListItem key={`${repository.id}-${index}`} divider>
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "#000",
                      fontWeight: "bold",
                    }}
                    to="/issues"
                    state={{ repo_ids: repository.id }}>
                    <ListItemText>{repository.name}</ListItemText>
                  </Link>
                </ListItem>
              ))}
            </List>
          </InfiniteScroll>
        </Paper>
      </Container>
    </div>
  );
};

export default Repos;
