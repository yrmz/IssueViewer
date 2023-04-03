import React, { useState } from "react";
import Header from "./Header";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroller";
import { Link } from "react-router-dom";
import { Button, Paper, Container, Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

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
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const getRepositories = async () => {
    try {
      const response = await axios.post(
        "https://api.github.com/graphql",
        {
          query: `
          query ($query: String!, $cursor: String) {
            search(query: $query, type: REPOSITORY, first: 15, after: $cursor) {
              pageInfo {
                endCursor
                hasNextPage
              }
              nodes {
                ... on Repository {
                  id
                  name
                }
              }
            }
          }`,
          variables: {
            query,
            cursor: endCursor,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_GITHUB_API_KEY}`,
          },
        }
      );

      const newRepositories = response.data.data.search.nodes;
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
    setIsOpen(!isOpen);
  };

  const toggleButton = () => {
    setIsOpen(!isOpen);
    setIsClicked(!isClicked);
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
          <div className={isClicked ? "d-none" : "show"}>
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
                    state={{ repo_ids: repository.id }}
                  >
                    <ListItemText>{repository.name}</ListItemText>
                  </Link>
                </ListItem>
              ))}
              <button
                className={isOpen ? "show showmore" : "d-none showmore"}
                onClick={toggleButton}
              >
                show more
              </button>
            </List>
          </div>
          <div className={isClicked ? "show" : "d-none"}>
            <InfiniteScroll
              pageStart={0}
              loadMore={loadMore}
              hasMore={hasMoreItems}
              loader={<div key={0}>Loading...</div>}
              useWindow={true}
            >
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
                      state={{ repo_ids: repository.id }}
                    >
                      <ListItemText>{repository.name}</ListItemText>
                    </Link>
                  </ListItem>
                ))}
              </List>
            </InfiniteScroll>
          </div>
        </Paper>
      </Container>
    </div>
  );
};

export default Repos;
