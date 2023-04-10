import React, { useContext } from "react";
import Header from "./Header";
import InfiniteScroll from "react-infinite-scroller";
import { Paper, Container } from "@mui/material";
import { getRepositories } from "./getQueries";
import RepositoryList from "./List";
import SearchForm from "./SearchForm";
import { searchFormContext, InfiniteScrollContent } from "../contexts";
import "./styles.css";

const Repos: React.FC = () => {
  const {
    setRepositories,
    setEndCursor,
    setHasMoreItems,
    query,
    endCursor,
    repositories,
    loadMore,
  } = useContext(searchFormContext);

  return (
    <div>
      <Container>
        <Header />
        <Paper sx={{ padding: 4, marginY: 5 }}>
          <SearchForm />
          <InfiniteScrollContent.Provider
            value={{
              pageStart: 0,
              initialLoad: false,
              loadMore: loadMore, // loadMore 関数を渡す
              hasMore: false,
              useWindow: true,
              threshold: 0,
            }}></InfiniteScrollContent.Provider>
          <InfiniteScroll loadMore={loadMore}>
            <RepositoryList repositories={repositories} />
          </InfiniteScroll>
        </Paper>
      </Container>
    </div>
  );
};

export default Repos;
