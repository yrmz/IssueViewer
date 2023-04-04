import React, { useState, createContext } from "react";
import Header from "./Header";
import InfiniteScroll from "react-infinite-scroller";
import { Button, Paper, Container, Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import { getRepositories } from "./getQueries";
import RepositoryList from "./List";

import "./styles.css";
interface Repository {
  id: string;
  name: string;
}

export type ContextType = Repository[];
export const Context = createContext<ContextType>([]); //ここで初期化

const Repos: React.FC = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [hasMoreItems, setHasMoreItems] = useState<boolean>(true);
  const [endCursor, setEndCursor] = useState<string | null>(null);
  const [query, setQuery] = useState<string>("");

  const [state, setState] = useState(
    "私はContextです。propsで渡してもらっていません。"
  );

  const loadMore = () => {
    getRepositories(
      query,
      endCursor,
      repositories,
      setRepositories,
      setHasMoreItems,
      setEndCursor
    );
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRepositories([]);
    setEndCursor(null);
    getRepositories(
      query,
      endCursor,
      repositories,
      setRepositories,
      setHasMoreItems,
      setEndCursor
    );
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
            <RepositoryList repositories={repositories} />
          </InfiniteScroll>
        </Paper>
      </Container>
    </div>
  );
};

export default Repos;
