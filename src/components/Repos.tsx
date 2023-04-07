import React, { useState } from "react";
import Header from "./Header";
import InfiniteScroll from "react-infinite-scroller";
import { Paper, Container } from "@mui/material";
import { getRepositories } from "./getQueries";
import RepositoryList from "./List";
import SearchForm from "./SearchForm";
import { searchFormContext } from "../contexts";
import { Repository } from "./types";
import "./styles.css";

const Repos: React.FC = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [hasMoreItems, setHasMoreItems] = useState<boolean>(true);
  const [endCursor, setEndCursor] = useState<string | null>(null);
  const [query, setQuery] = useState<any>("");

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

  return (
    <div>
      <Container>
        <Header />
        <Paper sx={{ padding: 4, marginY: 5 }}>
          <searchFormContext.Provider
            value={{
              query,
              endCursor,
              repositories,
              setRepositories,
              setEndCursor,
              setHasMoreItems,
              setQuery,
            }}
          >
            <SearchForm />

            <InfiniteScroll
              pageStart={0}
              initialLoad={false}
              loadMore={loadMore}
              hasMore={hasMoreItems}
              useWindow={true}
              threshold={100}
            >
              <RepositoryList repositories={repositories} />
            </InfiniteScroll>
          </searchFormContext.Provider>
        </Paper>
      </Container>
    </div>
  );
};

export default Repos;
